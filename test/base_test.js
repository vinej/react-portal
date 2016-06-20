import React from 'react';
import { expect } from 'chai';
import { shallow, mount, render } from 'enzyme';
import Test from '../src/helpers/test';

describe("Base test with enzyme", function() {
  it("contains spec with an expectation", function() {
    expect(shallow(<Test />).contains(<div className="test" />)).to.equal(true);
  });

  it("contains spec with an expectation", function() {
    expect(shallow(<Test />).is('.test')).to.equal(true);
  });

  it("contains spec with an expectation", function() {
    expect(mount(<Test />).find('.test').length).to.equal(1);
  });
});