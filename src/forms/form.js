// from the Michel Weststrate code
require("babel-polyfill")
import { observable, computed, extendObservable, autorunAsync } from 'mobx'
import { observer } from 'mobx-react'
import React, { Component } from 'react'

class Field {
  @observable _value;
  @observable _interacted;
  @observable _valid = true;
  @observable errorMessage;
  isRequired = false;
  _originalErrorMessage;
  
  markAsTouch() {
    if (!this._touched) {
      this._touched = true;
    }
  }

  @computed get valid() {
    return this._valid;
  }

  get value() {
    return this._value;
  }

  set value(val) {
    if (!this._interacted) {
      this._interacted = true;
    }
    this._value = val;

    this.validate();
  }

  init(val) {
    this._value = val;    
  }

  validate(force = false) {
    if (!this._validateFn) {
      return;
    }

    if (!force && !this._interacted) {
      // if we're not forcing the validation
      // and we haven't interacted with the field
      // we asume this field pass the validation status
      this._valid = true;
      this.errorMessage = '';
      return;
    }
    const res = this._validateFn(this, this.model.fields);

    // if the function returned a boolean we assume it is
    // the flag for the valid state
    if (typeof res === 'boolean') {
      this._valid = res;
      this.errorMessage = res ? '' : this._originalErrorMessage;
      return;
    }

    // otherwise we asumme we have received a promise
    const p = Promise.resolve(res);
    return new Promise((resolve) => { // eslint-disable-line consistent-return
      p.then(
        () => {
          this._valid = true;
          this.errorMessage = '';
          resolve(); // we use this to chain validators
        },
        ({ error } = {}) => {
          this.errorMessage = (error || '').trim() || this._originalErrorMessage;
          this._valid = false;
          resolve(); // we use this to chain validators
        });
    });
  }

  constructor(model, value, validatorDescriptor = {}) {
    this.model = model;
    this.value = value;
    this._originalErrorMessage = validatorDescriptor.errorMessage;
    this._validateFn = validatorDescriptor.fn || (() => Promise.resolve());
  }
}

export default class Form {
  @observable fields = {};
  @observable validating = false;
  @computed get valid() {
    if (this.validating) {
      return false; // consider the form invalid until the validation process finish
    }
    const keys = Object.keys(this.fields);
    return keys.reduce((seq, key) => {
      const field = this.fields[key];
      seq = seq && field.valid;
      return seq;
    }, true);
  }

  fieldKeys() {
    return Object.keys(this.fields);
  }

  validate() {
    this.validating = true;
    const p = this.fieldKeys().reduce((seq, key) => {
      const field = this.fields[key];
      return seq.then(() => field.validate(true));
    }, Promise.resolve());
    p.then(() => (this.validating = false));
    return p
  }
    
  toJSON() {
    const keys = Object.keys(this.fields);
    return keys.reduce((seq, key) => {
      const field = this.fields[key];
      seq[key] = field.value;
      return seq;
    }, {});
  }

  // standard to show backend error of the form
  renderAlert(message) {
    if (message) {
      return (
        <div className="rp-field-error">
          <strong>Oops! </strong><span>{message}</span>
        </div>
      );
    }
  }

  // standard to show validation error of the form
  renderError(error) {
    if (error && error != '' ) {
      return (
        <i className="fa fa-exclamation rp-field-error" title={error} />
      )
    }
  }
  
  constructor(initialState = {}, validators = {}) {
    const keys = Object.keys(initialState);

    keys.forEach((key) => {
      extendObservable(this.fields, {
        [key]: new Field(this, initialState[key], validators[key])
      });
    });

    autorunAsync(() => {
      this.onChange && this.onChange(this.valid, this.toJSON());
    }, 100);
  } 
}