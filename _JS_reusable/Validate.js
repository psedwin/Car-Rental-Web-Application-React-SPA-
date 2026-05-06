"use strict";

var Validate = {

    String: function (value, spec) {
        var trimmed = value.trim();
        var minLen = Number(spec.minLen);
        var maxLen = Number(spec.maxLen);

        if (spec.isRequired && trimmed.length === 0) {
            return spec.prompt + "is required. Please type at least " + (isNaN(minLen) ? 1 : minLen) + " character(s).";
        }

        if (!spec.isRequired && trimmed.length === 0) {
            return "";
        }

        if (!isNaN(minLen) && trimmed.length < minLen) {
            return spec.prompt + "must be at least " + minLen + " characters. You typed " + trimmed.length + ". Please add " + (minLen - trimmed.length) + " more character(s).";
        }

        if (!isNaN(maxLen) && trimmed.length > maxLen) {
            return spec.prompt + "must be no more than " + maxLen + " characters. You typed " + trimmed.length + ". Keep only this portion: \"" + trimmed.substring(0, maxLen) + "\"";
        }

        return "";
    },

    Number: function (value, spec) {
        var trimmed = value.trim();
        var num = Number(trimmed);
        var minVal = Number(spec.minVal);
        var maxVal = Number(spec.maxVal);

        if (spec.isRequired && trimmed.length === 0) {
            return spec.prompt + "is required. Please type a number" + addRange(minVal, maxVal) + ".";
        }

        if (!spec.isRequired && trimmed.length === 0) {
            return "";
        }

        if (isNaN(num)) {
            return spec.prompt + "must be a valid number" + addRange(minVal, maxVal) + ".";
        }

        if (!isNaN(minVal) && num < minVal) {
            return spec.prompt + "must be at least " + minVal + ". You entered " + num + ". Please increase the value.";
        }

        if (!isNaN(maxVal) && num > maxVal) {
            return spec.prompt + "must be no more than " + maxVal + ". You entered " + num + ". Please lower the value.";
        }

        return "";
    },

    Integer: function (value, spec) {
        var trimmed = value.trim();
        var num = Number(trimmed);
        var minVal = Number(spec.minVal);
        var maxVal = Number(spec.maxVal);

        if (spec.isRequired && trimmed.length === 0) {
            return spec.prompt + "is required. Please type a whole number" + addRange(minVal, maxVal) + ".";
        }

        if (!spec.isRequired && trimmed.length === 0) {
            return "";
        }

        if (isNaN(num) || !Number.isInteger(num)) {
            return spec.prompt + "must be a whole number" + addRange(minVal, maxVal) + ".";
        }

        if (!isNaN(minVal) && num < minVal) {
            return spec.prompt + "must be at least " + minVal + ". You entered " + num + ". Please increase the value.";
        }

        if (!isNaN(maxVal) && num > maxVal) {
            return spec.prompt + "must be no more than " + maxVal + ". You entered " + num + ". Please lower the value.";
        }

        return "";
    },

    Date: function (value, spec) {
        if (spec.isRequired && value === "") {
            return spec.prompt + "is required. Please choose a date.";
        }
        return "";
    },

    Choice: function (value, spec) {
        if (spec.isRequired && !value) {
            return spec.prompt + "is required. Please choose one of the provided options.";
        }
        return "";
    }
};

function addRange(minVal, maxVal) {
    if (!isNaN(minVal) && !isNaN(maxVal)) {
        return " between " + minVal + " and " + maxVal;
    }
    if (!isNaN(minVal)) {
        return " that is at least " + minVal;
    }
    if (!isNaN(maxVal)) {
        return " that is no more than " + maxVal;
    }
    return "";
}