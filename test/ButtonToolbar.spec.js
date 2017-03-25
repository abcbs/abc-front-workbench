
import React from 'react';                     // required to get test to work.  we can get around this later with more configuration
import { shallow } from 'enzyme';              // method from enzyme which allows us to do shallow render
// import our soon to be component

import { expect } from 'chai';
import ButtonToolbar from '../src/abc-bootstrap/components/ButtonToolbar';

global.expect = expect;
// global.sinon = sinon;

describe('(Container) Root', () => {
    it('renders as a <div>', () => {
        // console.log("process.env.NODE_ENV is,",process.env.NODE_ENV)
        const wrapper = shallow(<ButtonToolbar>
            6
        </ButtonToolbar>);
        console.log(wrapper);
        expect(wrapper.type()).to.eql('div');
    });

});