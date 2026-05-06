"use strict";

function MakeEditArea({
    title = "Untitled",
    fieldSpecs = [],
    editObj = null,
    submitLabel = "Submit",
    cancelLabel = "Cancel",
    onSubmit = function () { },
    onCancel = function () { }
} = {}) {

    var editArea = MakeTag("div", "editArea");
    var heading = MakeTag("h2", "editAreaTitle", title || "Untitled");
    var form = MakeTag("div", "editAreaForm");
    var buttonRow = MakeTag("div", "editAreaButtonRow");
    var submitBtn = MakeTag("button", "editAreaBtn primaryBtn", submitLabel);
    var cancelBtn = MakeTag("button", "editAreaBtn secondaryBtn", cancelLabel);
    var fieldRefs = [];

    submitBtn.type = "button";
    cancelBtn.type = "button";

    editArea.appendChild(heading);
    editArea.appendChild(form);
    buttonRow.appendChild(submitBtn);
    buttonRow.appendChild(cancelBtn);
    editArea.appendChild(buttonRow);

    for (var i = 0; i < fieldSpecs.length; i++) {
        var rowInfo = makeFieldRow(fieldSpecs[i]);
        fieldRefs.push(rowInfo);
        form.appendChild(rowInfo.row);
    }

    submitBtn.onclick = function () {
        var allGood = true;
        var outputObj = {};

        for (var j = 0; j < fieldRefs.length; j++) {
            var fieldRef = fieldRefs[j];
            var msg = validateField(fieldRef.spec, fieldRef.getValue());
            fieldRef.errorDiv.textContent = msg;

            if (msg) {
                allGood = false;
            } else {
                outputObj[fieldRef.spec.fieldName] = convertValue(fieldRef.spec, fieldRef.getValue());
            }
        }

        if (allGood) {
            onSubmit(outputObj);
        }
    };

    cancelBtn.onclick = function () {
        clearErrors();
        onCancel();
    };

    function clearErrors() {
        for (var k = 0; k < fieldRefs.length; k++) {
            fieldRefs[k].errorDiv.textContent = "";
        }
    }

    function makeFieldRow(spec) {
        var row = MakeTag("div", "editAreaField");
        var label = MakeTag("label", "editAreaPrompt", spec.prompt + (spec.isRequired ? " *" : ""));
        var controlWrap = MakeTag("div", "editAreaControlWrap");
        var errorDiv = MakeTag("div", "editAreaError");
        var controlInfo = buildControl(spec);

        controlWrap.appendChild(controlInfo.control);
        row.appendChild(label);
        row.appendChild(controlWrap);
        row.appendChild(errorDiv);

        return {
            row: row,
            spec: spec,
            errorDiv: errorDiv,
            getValue: controlInfo.getValue
        };
    }

    function buildControl(spec) {
        var startValue = resolveStartValue(spec);
        var control;

        if (spec.dataType === "string") {
            control = document.createElement("input");
            control.type = "text";
            control.className = "editAreaInput";
            control.value = startValue;
            if (spec.maxLen) {
                control.maxLength = spec.maxLen;
            }
            return {
                control: control,
                getValue: function () {
                    return control.value;
                }
            };
        }

        if (spec.dataType === "number") {
            control = document.createElement("input");
            control.type = "number";
            control.className = "editAreaInput";
            if (spec.minVal !== undefined) {
                control.min = spec.minVal;
            }
            if (spec.maxVal !== undefined) {
                control.max = spec.maxVal;
            }
            control.step = spec.step || "any";
            control.value = startValue;
            return {
                control: control,
                getValue: function () {
                    return control.value;
                }
            };
        }

        if (spec.dataType === "integer") {
            control = document.createElement("input");
            control.type = "number";
            control.className = "editAreaInput";
            control.step = "1";
            if (spec.minVal !== undefined) {
                control.min = spec.minVal;
            }
            if (spec.maxVal !== undefined) {
                control.max = spec.maxVal;
            }
            control.value = startValue;
            return {
                control: control,
                getValue: function () {
                    return control.value;
                }
            };
        }

        if (spec.dataType === "date") {
            control = document.createElement("input");
            control.type = "date";
            control.className = "editAreaInput";
            control.value = startValue;
            return {
                control: control,
                getValue: function () {
                    return control.value;
                }
            };
        }

        if (spec.dataType === "radio") {
            var radioWrap = MakeTag("div", "editAreaChoiceWrap");
            var radios = [];
            var options = spec.options || [];

            for (var i = 0; i < options.length; i++) {
                var radioLabel = MakeTag("label", "editAreaChoiceLabel");
                var radio = document.createElement("input");
                var option = normalizeOption(options[i]);

                radio.type = "radio";
                radio.value = option.value;
                radio.checked = option.value === startValue;

                radioLabel.appendChild(radio);
                radioLabel.appendChild(document.createTextNode(" " + option.label));
                radioWrap.appendChild(radioLabel);
                radios.push(radio);
            }

            var radioName = spec.fieldName + "_group_" + Math.random().toString(36).substring(2, 9);
            for (var r = 0; r < radios.length; r++) {
                radios[r].name = radioName;
            }

            return {
                control: radioWrap,
                getValue: function () {
                    for (var x = 0; x < radios.length; x++) {
                        if (radios[x].checked) {
                            return radios[x].value;
                        }
                    }
                    return "";
                }
            };
        }

        if (spec.dataType === "select") {
            var select = document.createElement("select");
            select.className = "editAreaInput";

            if (!spec.isRequired) {
                var blankOption = document.createElement("option");
                blankOption.value = "";
                blankOption.textContent = "Choose one";
                select.appendChild(blankOption);
            }

            var selectOptions = spec.options || [];
            for (var s = 0; s < selectOptions.length; s++) {
                var selectOption = normalizeOption(selectOptions[s]);
                var opt = document.createElement("option");
                opt.value = selectOption.value;
                opt.textContent = selectOption.label;
                if (selectOption.value === startValue) {
                    opt.selected = true;
                }
                select.appendChild(opt);
            }

            if (startValue === "" && !spec.isRequired) {
                select.value = "";
            }

            return {
                control: select,
                getValue: function () {
                    return select.value;
                }
            };
        }

        control = MakeTag("div", "editAreaUnsupported", "Unsupported data type: " + spec.dataType);
        return {
            control: control,
            getValue: function () {
                return "";
            }
        };
    }

    function resolveStartValue(spec) {
        if (editObj && editObj[spec.fieldName] !== undefined && editObj[spec.fieldName] !== null) {
            return String(editObj[spec.fieldName]);
        }
        if (spec.defaultValue !== undefined && spec.defaultValue !== null) {
            return String(spec.defaultValue);
        }
        return "";
    }

    function normalizeOption(option) {
        if (typeof option === "string") {
            return {
                value: option,
                label: option
            };
        }
        return option;
    }

    function validateField(spec, rawValue) {
        if (spec.dataType === "string") {
            return Validate.String(rawValue, spec);
        }
        if (spec.dataType === "number") {
            return Validate.Number(rawValue, spec);
        }
        if (spec.dataType === "integer") {
            return Validate.Integer(rawValue, spec);
        }
        if (spec.dataType === "date") {
            return Validate.Date(rawValue, spec);
        }
        if (spec.dataType === "radio" || spec.dataType === "select") {
            return Validate.Choice(rawValue, spec);
        }
        return "";
    }

    function convertValue(spec, rawValue) {
        if (rawValue === "") {
            return "";
        }
        if (spec.dataType === "number") {
            return Number(rawValue);
        }
        if (spec.dataType === "integer") {
            return parseInt(rawValue);
        }
        return rawValue;
    }

    return editArea;
}