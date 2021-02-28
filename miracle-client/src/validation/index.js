import { isEmail } from 'validator';
import React from 'react';

export const required = (value, props) => {
    if (!value || (props.isCheckable && !props.checked)) {
        return <span className="error-msg">Required</span>;
    }
};

export const requiredWhenUserActive = (value, props) => {
    if (props.statusId === 4 && (!value || (props.isCheckable && !props.checked))) {
        return <span className="error-msg">Required</span>;
    }
};

export const email = (value) => {
    if (!isEmail(value)) {
        return <span className="error-msg">Invalid Email</span>;
    }
};

export const emailWhenActive = (value, props) => {
    if (props.statusId === 4 && !isEmail(value)) {
        return <span className="error-msg">Invalid Email</span>;
    }
};

export const minlength = (value, props) => {
    if (value.length < props.minlength) {
        return <span className="error-msg">{'Minimum length: ' + props.minlength}</span>;
    }
};

export const maxlength = (value, props) => {
    if (value.length > props.maxlength) {
        return <span className="error-msg">{'Maximum length: ' + props.maxlength}</span>;
    }
};

export const password = (value, props, components) => {
    if (value !== components[props.newPasswordControlName][0].value) {
        return <span className="error-msg">Passwords are not equal.</span>
    }
};