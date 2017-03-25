import React from 'react';                     // required to get test to work.  we can get around this later with more configuration
import { shallow } from 'enzyme';              // method from enzyme which allows us to do shallow render
// import our soon to be component

import { expect } from 'chai';
import {ADD_TODO,addTodo} from '../src/todos/actions';

global.expect = expect;
// global.sinon = sinon;

describe('(actions) addTodo', () => {
    it('addTodo', () => {
        const text = 'Finish docs'
        const expectedAction = {
            type: ADD_TODO,
            text
        }
        var v=addTodo(text);
        console.log(v);
        expect(v).to.eql(expectedAction)

    })
});