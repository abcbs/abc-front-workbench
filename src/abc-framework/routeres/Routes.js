import React, { PropTypes } from 'react';
import { Provider } from 'react-redux';
import { Router, Route,IndexRoute, browserHistory } from 'react-router';
import authorization from '../authorize/authorize'
import AbcMainPage from '../ui/AbcPCUIPage'

//
import Not_found        from '../../abc-ui/errors/notfound'
import Unauthenticated  from '../../abc-ui/errors/unauthenticated'
import Unauthorized     from '../../abc-ui/errors/unauthorized'
import Generic_error    from '../../abc-ui/errors/generic'

import App from '../../todos/containers/App';
//测试页
import NotFoundPage from '../ui/AbcNotFoundPage'
import IntroductionPage from '../../todos/frames/IntroductionPage'
import HomePage from '../../todos/frames/HomePage'
import {UserPage} from '../../abc-core-component/users/User-Index'
import {AuthenticationPage} from '../../abc-core-component/authentication/Authentication-Index'
import {ProductPage,ProudctList} from '../../abc-core-component/products/Product-Index'
import TodosMvc from '../../todomvc/containers/App';
const authorize = (component, is_authorized) => authorization(is_authorized)(component);

export default (//component={authorize(IntroductionPage)}
    <Route path="/" component={AbcMainPage}>
        <IndexRoute component={ProductPage}/>
        <Route  path="/app(/:filter)" component={App} />
        <Route path="/todosmvc(/:filter)" component={TodosMvc} />
        <Route  path="/user" component={UserPage} />
        <Route  path="/authentication" component={AuthenticationPage} />
        <Route  path="/product" component={ProductPage} />
        <Route  path="/list" component={ProudctList} />
        <Route  path="/home" component={HomePage} />

        <Route  path="/introduct" component={authorize(IntroductionPage)} />
            TodosMvc
        <Route path="unauthenticated" status={401} component={Unauthenticated}/>
        <Route path="unauthorized"    status={403} component={Unauthorized}/>
        <Route path="error"           status={500} component={Generic_error}/>
        <Route  path="*" component={Not_found} />
    </Route>
);