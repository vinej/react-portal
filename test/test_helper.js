import _$ from 'jquery';
import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import jsdom from 'jsdom';
import chai, { expect } from 'chai';
import chaiJquery from 'chai-jquery';
import { addLocaleData, IntlProvider } from 'react-intl'
import { app } from '../src/helpers/translation'

require('babel-register')();

var exposedProperties = ['window', 'navigator', 'document'];

global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;
const $ = _$(window);

var locale = window.navigator.userLanguage || window.navigator.language
var localePrefix = locale.slice(0, locale.indexOf('-'));
if (localePrefix !== 'en' && localePrefix !==  'fr') {
  locale = 'en-US'
  localePrefix = 'en'
}
const defaultApp = app['en'];
import en from 'react-intl/locale-data/en';
import fr from 'react-intl/locale-data/fr'
addLocaleData([...en, ...fr]);


Object.keys(document.defaultView).forEach((property) => {
   if (typeof global[property] === 'undefined') {
     exposedProperties.push(property);
     global[property] = document.defaultView[property];
   }
});

global.navigator = {
  userAgent: 'node.js'
};
 
chaiJquery(chai, chai.util, $);

function renderComponent(ComponentClass, props = {}, state = {}) {
  const componentInstance =  TestUtils.renderIntoDocument(
    <IntlProvider locale={locale} messages={app[localePrefix] || defaultApp}>
      <ComponentClass {...props} />
    </IntlProvider>
  );

  return { instance: componentInstance, component: $(ReactDOM.findDOMNode(componentInstance)) }
}

$.fn.simulate = function(eventName, value) {
  if (value) {
    this.val(value);
  }
  TestUtils.Simulate[eventName](this[0]);
};

export {renderComponent, expect};
