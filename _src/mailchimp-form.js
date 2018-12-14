/* eslint-disable */
// From https://css-tricks.com/form-validation-part-4-validating-mailchimp-subscribe-form/
// From @ChrisFerdinandi

// A Validity State Polyfill
;(function (window, document, undefined) {

    'use strict';

    // Make sure that ValidityState is supported in full (all features)
    var supported = function () {
        var input = document.createElement('input');
        return ('validity' in input && 'badInput' in input.validity && 'patternMismatch' in input.validity && 'rangeOverflow' in input.validity && 'rangeUnderflow' in input.validity && 'stepMismatch' in input.validity && 'tooLong' in input.validity && 'tooShort' in input.validity && 'typeMismatch' in input.validity && 'valid' in input.validity && 'valueMissing' in input.validity);
    };

    /**
     * Generate the field validity object
     * @param  {Node]} field The field to validate
     * @return {Object}      The validity object
     */
    var getValidityState = function (field) {

        // Variables
        var type = field.getAttribute('type') || input.nodeName.toLowerCase();
        var isNum = type === 'number' || type === 'range';
        var length = field.value.length;
        var valid = true;

        // If radio group, get selected field
        if (field.type === 'radio' && field.name) {
            var group = document.getElementsByName(field.name);
            if (group.length > 0) {
                for (var i = 0; i < group.length; i++) {
                    if (group[i].form === field.form && field.checked) {
                        field = group[i];
                        break;
                    }
                }
            }
        }

        // Run validity checks
        var checkValidity = {
            badInput: (isNum && length > 0 && !/[-+]?[0-9]/.test(field.value)), // value of a number field is not a number
            patternMismatch: (field.hasAttribute('pattern') && length > 0 && new RegExp(field.getAttribute('pattern')).test(field.value) === false), // value does not conform to the pattern
            rangeOverflow: (field.hasAttribute('max') && isNum && field.value > 0 && Number(field.value) > Number(field.getAttribute('max'))), // value of a number field is higher than the max attribute
            rangeUnderflow: (field.hasAttribute('min') && isNum && field.value > 0 && Number(field.value) < Number(field.getAttribute('min'))), // value of a number field is lower than the min attribute
            stepMismatch: (isNum && ((field.hasAttribute('step') && field.getAttribute('step') !== 'any' && Number(field.value) % Number(field.getAttribute('step')) !== 0) || (!field.hasAttribute('step') && Number(field.value) % 1 !== 0))), // value of a number field does not conform to the stepattribute
            tooLong: (field.hasAttribute('maxLength') && field.getAttribute('maxLength') > 0 && length > parseInt(field.getAttribute('maxLength'), 10)), // the user has edited a too-long value in a field with maxlength
            tooShort: (field.hasAttribute('minLength') && field.getAttribute('minLength') > 0 && length > 0 && length < parseInt(field.getAttribute('minLength'), 10)), // the user has edited a too-short value in a field with minlength
            typeMismatch: (length > 0 && ((type === 'email' && !/^([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x22([^\x0d\x22\x5c\x80-\xff]|\x5c[\x00-\x7f])*\x22))*\x40([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d)(\x2e([^\x00-\x20\x22\x28\x29\x2c\x2e\x3a-\x3c\x3e\x40\x5b-\x5d\x7f-\xff]+|\x5b([^\x0d\x5b-\x5d\x80-\xff]|\x5c[\x00-\x7f])*\x5d))*$/.test(field.value)) || (type === 'url' && !/^(?:(?:https?|HTTPS?|ftp|FTP):\/\/)(?:\S+(?::\S*)?@)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)(?:\.(?:[a-zA-Z\u00a1-\uffff0-9]-*)*[a-zA-Z\u00a1-\uffff0-9]+)*)(?::\d{2,5})?(?:[\/?#]\S*)?$/.test(field.value)))), // value of a email or URL field is not an email address or URL
            valueMissing: (field.hasAttribute('required') && (((type === 'checkbox' || type === 'radio') && !field.checked) || (type === 'select' && field.options[field.selectedIndex].value < 1) || (type !=='checkbox' && type !== 'radio' && type !=='select' && length < 1))) // required field without a value
        };

        // Check if any errors
        for (var key in checkValidity) {
            if (checkValidity.hasOwnProperty(key)) {
                // If there's an error, change valid value
                if (checkValidity[key]) {
                    valid = false;
                    break;
                }
            }
        }

        // Add valid property to validity object
        checkValidity.valid = valid;

        // Return object
        return checkValidity;

    };

    // If the full set of ValidityState features aren't supported, polyfill
    // if (!supported()) {
        Object.defineProperty(HTMLInputElement.prototype, 'validity', {
            get: function ValidityState() {
                return getValidityState(this);
            },
            configurable: true,
        });
    // }

})(window, document);


/*
 * classList.js: Cross-browser full element.classList implementation.
 * 1.1.20170427
 *
 * By Eli Grey, http://eligrey.com
 * License: Dedicated to the public domain.
 *   See https://github.com/eligrey/classList.js/blob/master/LICENSE.md
 */

/*global self, document, DOMException */

/*! @source http://purl.eligrey.com/github/classList.js/blob/master/classList.js */

if ("document" in self) {

// Full polyfill for browsers with no classList support
// Including IE < Edge missing SVGElement.classList
if (!("classList" in document.createElement("_")) 
    || document.createElementNS && !("classList" in document.createElementNS("http://www.w3.org/2000/svg","g"))) {

(function (view) {

"use strict";

if (!('Element' in view)) return;

var
      classListProp = "classList"
    , protoProp = "prototype"
    , elemCtrProto = view.Element[protoProp]
    , objCtr = Object
    , strTrim = String[protoProp].trim || function () {
        return this.replace(/^\s+|\s+$/g, "");
    }
    , arrIndexOf = Array[protoProp].indexOf || function (item) {
        var
              i = 0
            , len = this.length
        ;
        for (; i < len; i++) {
            if (i in this && this[i] === item) {
                return i;
            }
        }
        return -1;
    }
    // Vendors: please allow content code to instantiate DOMExceptions
    , DOMEx = function (type, message) {
        this.name = type;
        this.code = DOMException[type];
        this.message = message;
    }
    , checkTokenAndGetIndex = function (classList, token) {
        if (token === "") {
            throw new DOMEx(
                  "SYNTAX_ERR"
                , "An invalid or illegal string was specified"
            );
        }
        if (/\s/.test(token)) {
            throw new DOMEx(
                  "INVALID_CHARACTER_ERR"
                , "String contains an invalid character"
            );
        }
        return arrIndexOf.call(classList, token);
    }
    , ClassList = function (elem) {
        var
              trimmedClasses = strTrim.call(elem.getAttribute("class") || "")
            , classes = trimmedClasses ? trimmedClasses.split(/\s+/) : []
            , i = 0
            , len = classes.length
        ;
        for (; i < len; i++) {
            this.push(classes[i]);
        }
        this._updateClassName = function () {
            elem.setAttribute("class", this.toString());
        };
    }
    , classListProto = ClassList[protoProp] = []
    , classListGetter = function () {
        return new ClassList(this);
    }
;
// Most DOMException implementations don't allow calling DOMException's toString()
// on non-DOMExceptions. Error's toString() is sufficient here.
DOMEx[protoProp] = Error[protoProp];
classListProto.item = function (i) {
    return this[i] || null;
};
classListProto.contains = function (token) {
    token += "";
    return checkTokenAndGetIndex(this, token) !== -1;
};
classListProto.add = function () {
    var
          tokens = arguments
        , i = 0
        , l = tokens.length
        , token
        , updated = false
    ;
    do {
        token = tokens[i] + "";
        if (checkTokenAndGetIndex(this, token) === -1) {
            this.push(token);
            updated = true;
        }
    }
    while (++i < l);

    if (updated) {
        this._updateClassName();
    }
};
classListProto.remove = function () {
    var
          tokens = arguments
        , i = 0
        , l = tokens.length
        , token
        , updated = false
        , index
    ;
    do {
        token = tokens[i] + "";
        index = checkTokenAndGetIndex(this, token);
        while (index !== -1) {
            this.splice(index, 1);
            updated = true;
            index = checkTokenAndGetIndex(this, token);
        }
    }
    while (++i < l);

    if (updated) {
        this._updateClassName();
    }
};
classListProto.toggle = function (token, force) {
    token += "";

    var
          result = this.contains(token)
        , method = result ?
            force !== true && "remove"
        :
            force !== false && "add"
    ;

    if (method) {
        this[method](token);
    }

    if (force === true || force === false) {
        return force;
    } else {
        return !result;
    }
};
classListProto.toString = function () {
    return this.join(" ");
};

if (objCtr.defineProperty) {
    var classListPropDesc = {
          get: classListGetter
        , enumerable: true
        , configurable: true
    };
    try {
        objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
    } catch (ex) { // IE 8 doesn't support enumerable:true
        // adding undefined to fight this issue https://github.com/eligrey/classList.js/issues/36
        // modernie IE8-MSW7 machine has IE8 8.0.6001.18702 and is affected
        if (ex.number === undefined || ex.number === -0x7FF5EC54) {
            classListPropDesc.enumerable = false;
            objCtr.defineProperty(elemCtrProto, classListProp, classListPropDesc);
        }
    }
} else if (objCtr[protoProp].__defineGetter__) {
    elemCtrProto.__defineGetter__(classListProp, classListGetter);
}

}(self));

}

// There is full or partial native classList support, so just check if we need
// to normalize the add/remove and toggle APIs.

(function () {
    "use strict";

    var testElement = document.createElement("_");

    testElement.classList.add("c1", "c2");

    // Polyfill for IE 10/11 and Firefox <26, where classList.add and
    // classList.remove exist but support only one argument at a time.
    if (!testElement.classList.contains("c2")) {
        var createMethod = function(method) {
            var original = DOMTokenList.prototype[method];

            DOMTokenList.prototype[method] = function(token) {
                var i, len = arguments.length;

                for (i = 0; i < len; i++) {
                    token = arguments[i];
                    original.call(this, token);
                }
            };
        };
        createMethod('add');
        createMethod('remove');
    }

    testElement.classList.toggle("c3", false);

    // Polyfill for IE 10 and Firefox <24, where classList.toggle does not
    // support the second argument.
    if (testElement.classList.contains("c3")) {
        var _toggle = DOMTokenList.prototype.toggle;

        DOMTokenList.prototype.toggle = function(token, force) {
            if (1 in arguments && !this.contains(token) === !force) {
                return force;
            } else {
                return _toggle.call(this, token);
            }
        };

    }

    testElement = null;
}());

}


// Add the novalidate attribute when the JS loads
var forms = document.querySelectorAll('.validate');
for (var i = 0; i < forms.length; i++) {
    forms[i].setAttribute('novalidate', true);
}


// Validate the field
var hasError = function (field) {

    // Don't validate submits, buttons, file and reset inputs, and disabled fields
    if (field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') return;

    // Get validity
    var validity = field.validity;

    // If valid, return null
    if (validity.valid) return;

    // If field is required and empty
    if (validity.valueMissing) return 'Please fill out this field.';

    // If not the right type
    if (validity.typeMismatch) {

        // Email
        if (field.type === 'email') return 'Please enter an email address.';

        // URL
        if (field.type === 'url') return 'Please enter a URL.';

    }

    // If too short
    if (validity.tooShort) return 'Please lengthen this text to ' + field.getAttribute('minLength') + ' characters or more. You are currently using ' + field.value.length + ' characters.';

    // If too long
    if (validity.tooLong) return 'Please shorten this text to no more than ' + field.getAttribute('maxLength') + ' characters. You are currently using ' + field.value.length + ' characters.';

    // If pattern doesn't match
    if (validity.patternMismatch) {

        // If pattern info is included, return custom error
        if (field.hasAttribute('title')) return field.getAttribute('title');

        // Otherwise, generic error
        return 'Please match the requested format.';

    }

    // If number input isn't a number
    if (validity.badInput) return 'Please enter a number.';

    // If a number value doesn't match the step interval
    if (validity.stepMismatch) return 'Please select a valid value.';

    // If a number field is over the max
    if (validity.rangeOverflow) return 'Please select a value that is no more than ' + field.getAttribute('max') + '.';

    // If a number field is below the min
    if (validity.rangeUnderflow) return 'Please select a value that is no less than ' + field.getAttribute('min') + '.';

    // If all else fails, return a generic catchall error
    return 'The value you entered for this field is invalid.';

};


// Show an error message
var showError = function (field, error) {

    // Add error class to field
    field.classList.add('error');
  
    // If the field is a radio button and part of a group, error all and get the last item in the group
    if (field.type === 'radio' && field.name) {
        var group = field.form.querySelectorAll('[name="' + field.name + '"]');
        if (group.length > 0) {
            for (var i = 0; i < group.length; i++) {
                group[i].classList.add('error');
            }
            field = group[group.length - 1];
        }
    }

    // Get field id or name
    var id = field.id || field.name;
    if (!id) return;

    // Check if error message field already exists
    // If not, create one
    var message = field.form.querySelector('.error-message#error-for-' + id );
    if (!message) {
        message = document.createElement('div');
        message.className = 'error-message';
        message.id = 'error-for-' + id;
        
        // If the field is a radio button or checkbox, insert error after the label
        var label;
        if (field.type === 'radio' || field.type ==='checkbox') {
            label = field.form.querySelector('label[for="' + id + '"]') || field.parentNode;
            if (label) {
                label.parentNode.insertBefore( message, label.nextSibling );
            }
        }

        // Otherwise, insert it after the field
        if (!label) {
            field.parentNode.insertBefore( message, field.nextSibling );
        }

    }
    
    // Add ARIA role to the field
    field.setAttribute('aria-describedby', 'error-for-' + id);

    // Update error message
    message.innerHTML = error;

    // Show error message
    message.style.display = 'block';
    message.style.visibility = 'visible';

};


// Remove the error message
var removeError = function (field) {

    // Remove error class to field
    field.classList.remove('error');
    
    // Remove ARIA role from the field
    field.removeAttribute('aria-describedby');

    // If the field is a radio button and part of a group, remove error from all and get the last item in the group
    if (field.type === 'radio' && field.name) {
        var group = field.form.querySelectorAll('[name="' + field.name + '"]');
        if (group.length > 0) {
            for (var i = 0; i < group.length; i++) {
                group[i].classList.remove('error');
            }
            field = group[group.length - 1];
        }
    }

    // Get field id or name
    var id = field.id || field.name;
    if (!id) return;
    

    // Check if an error message is in the DOM
    var message = field.form.querySelector('.error-message#error-for-' + id + '');
    if (!message) return;

    // If so, hide it
    message.innerHTML = '';
    message.style.display = 'none';
    message.style.visibility = 'hidden';

};

// Serialize the form data into a query string
// Forked and modified from https://stackoverflow.com/a/30153391/1293256
var serialize = function (form) {
    
    // Setup our serialized data
    var serialized = '';
    
    // Loop through each field in the form
    for (i = 0; i < form.elements.length; i++) {

        var field = form.elements[i];

        // Don't serialize fields without a name, submits, buttons, file and reset inputs, and disabled fields
        if (!field.name || field.disabled || field.type === 'file' || field.type === 'reset' || field.type === 'submit' || field.type === 'button') continue;

        // Convert field data to a query string
        if ((field.type !== 'checkbox' && field.type !== 'radio') || field.checked) {
            serialized += '&' + encodeURIComponent(field.name) + "=" + encodeURIComponent(field.value);
        }
    }

    return serialized;

};

// Display the form status
window.displayMailChimpStatus = function (data) {

    // Make sure the data is in the right format and that there's a status container
    if (!data.result || !data.msg || !mcStatus ) return;

    // Update our status message
    mcStatus.innerHTML = data.msg;

    // If error, add error class
    if (data.result === 'error') {
        mcStatus.classList.remove('success-message');
        mcStatus.classList.add('error-message');
        return;
    }

    // Otherwise, add success class
    mcStatus.classList.remove('error-message');
    mcStatus.classList.add('success-message');
};

// Submit the form
var submitMailChimpForm = function (form) {

    // Get the Submit URL
    var url = form.getAttribute('action');
    url = url.replace('/post?u=', '/post-json?u=');
    url += serialize(form) + '&c=displayMailChimpStatus';

    // Create script with url and callback (if specified)
    var ref = window.document.getElementsByTagName( 'script' )[ 0 ];
    var script = window.document.createElement( 'script' );
    script.src = url;

    // Create a global variable for the status container
    window.mcStatus = form.querySelector('.mc-status');

    // Insert script tag into the DOM (append to <head>)
    ref.parentNode.insertBefore( script, ref );

    // After the script is loaded (and executed), remove it
    script.onload = function () {
        this.remove();
    };

};

// Listen to all blur events
document.addEventListener('blur', function (event) {

    // Only run if the field is in a form to be validated
    if (!event.target.form.classList.contains('validate')) return;

    // Validate the field
    var error = hasError(event.target);
  
    // If there's an error, show it
    if (error) {
        showError(event.target, error);
        return;
    }

    // Otherwise, remove any existing error message
    removeError(event.target);

}, true);


// Check all fields on submit
document.addEventListener('submit', function (event) {

    // Only run on forms flagged for validation
    if (!event.target.classList.contains('validate')) return;

    // Prevent form from submitting
    event.preventDefault();

    // Get all of the form elements
    var fields = event.target.elements;

    // Validate each field
    // Store the first field with an error to a variable so we can bring it into focus later
    var error, hasErrors;
    for (var i = 0; i < fields.length; i++) {
        error = hasError(fields[i]);
        if (error) {
            showError(fields[i], error);
            if (!hasErrors) {
                hasErrors = fields[i];
            }
        }
    }

    // If there are errrors, don't submit form and focus on first element with error
    if (hasErrors) {
        hasErrors.focus();
    }

    // Otherwise, let the form submit normally
    // You could also bolt in an Ajax form submit process here
    submitMailChimpForm(event.target);

}, false);
