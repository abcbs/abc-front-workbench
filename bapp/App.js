

import React from 'react';
import ReactDom from 'react-dom';
import 'bootstrap/less/bootstrap.less';
import './styles/custom-styles.css';

import Body from './Body';
import Footer from './Footer';
import HeaderNavigation from './HeaderNavigation'
global.React = React;

ReactDom.render(
  <div>
    <HeaderNavigation />
    <Body />
    <Footer />
  </div>
  , document.getElementById('root'));


 require( ['./activeButton'], function( activeButton){

    console.log("test");
});

