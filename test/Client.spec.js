
import React from 'react';                     // required to get test to work.  we can get around this later with more configuration
import { shallow } from 'enzyme';              // method from enzyme which allows us to do shallow render
// import our soon to be component

import { expect } from 'chai';
import Client from '../src/abc-framework/endpoint/Client';

global.expect = expect;
// global.sinon = sinon;

describe('(Client) Root', () => {
    it('renders as a <div>', () => {
        // console.log("process.env.NODE_ENV is,",process.env.NODE_ENV)
     
        const wrapper = shallow(
            <Client ></Client>
        );
        console.log("wrapper,",wrapper);
        console.log("wrapper.type,",wrapper.type());
        console.log("wrapper.props,",wrapper.props());
        const {onClick,...props}=wrapper.unrendered.props;
        console.log("onClick,",onClick);
        onClick('test...')
        console.log("wrapper.props,",props);
        expect(wrapper.type()).to.eql('div');
    });

});