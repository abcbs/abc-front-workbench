
import React from 'react';                     // required to get test to work.  we can get around this later with more configuration
import { shallow } from 'enzyme';              // method from enzyme which allows us to do shallow render
// import our soon to be component

import { expect } from 'chai';
import Checkbox from '../src/abc-bootstrap/components/Checkbox';

global.expect = expect;
// global.sinon = sinon;

describe('(Container) Root', () => {
    it('renders as a <div>', () => {
        // console.log("process.env.NODE_ENV is,",process.env.NODE_ENV)
        function handleClick(e) {
            console.log("handleClick,value is,",e);
        }
        const wrapper = shallow(
            <Checkbox onClick={handleClick.bind(this)}></Checkbox>
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