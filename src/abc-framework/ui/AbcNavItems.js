import React,{ Component, PropTypes, Children } from 'react'
import { Link } from 'react-router';
import {Nav,NavItem} from '../../abc-bootstrap'
import NAV_LINKS from '../routeres/NavLinks'


export default class AbcNavItems extends Component {
    
    render() {
        return (
               <Nav>
                {
                    Object.entries(NAV_LINKS).map(([linkName, {path, title}]) => (
                      <li  style={{marginLeft:"20px"}}  key={linkName}>
                            <Link to={path}>
                                   {title}
                             </Link>
                       </li>
                   ))
                }
            </Nav>

        )
    }
}


