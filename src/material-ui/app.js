import React from 'react'
import { render } from 'react-dom'
import { Router, Route, hashHistory } from 'react-router'

import injectTapEventPlugin from 'react-tap-event-plugin';
import FastClick from 'fastclick';
import Main from './Main'
import Home from './Home'
import ToolbarExamplesSimple from './ToolbarExamplesSimple'
import AutoCompleteExampleSimple from './AutoCompleteExampleSimple'
import AvatarExampleSimple from './AvatarExampleSimple'
import BadgeExample from './BadgeExampleSimple'
import MainBaseTheme from "./MainBaseTheme"
import DrawerOpenRightExample from './DrawerOpenRightExample'

injectTapEventPlugin();

// Make taps on links and buttons work fast on mobiles
FastClick.attach(document.body);

render((
    <Router history={hashHistory}>
        <Route path="/" component={Home}/>
        <Route path="/main" component={Main}/>
        <Route path="/toolbar" component={ToolbarExamplesSimple}/>
        <Route path="/autocomplete" component={AutoCompleteExampleSimple}/>
        <Route path="/avatar" component={AvatarExampleSimple}/>
        <Route path="/badge" component={BadgeExample}/>
        <Route path="/bainBaseTheme" component={MainBaseTheme}/>
        <Route path="/drawer" component={DrawerOpenRightExample}/>
    </Router>
), document.getElementById('root'));
