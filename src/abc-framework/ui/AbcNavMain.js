import React,{ Component, PropTypes, Children } from 'react'
import { Link } from 'react-router';
import entries from 'lodash/entries'
import {Navbar, Nav} from '../../abc-bootstrap'
import NAV_LINKS from '../routeres/NavLinks'
import { defineMessages }              from 'react-intl'
import international from '../international/internationalize'
import AbcNavItems from './AbcNavItems'
const messages = defineMessages
({
    application: {
            title: {
                id: 'application.title',
                description: '主题',
                defaultMessage: '首页'
            },
            subTitle: {
                id: 'home.subTitle',
                description: '首页子标题',
                defaultMessage: '欢迎光临'
            }
        }
    }
)

Object.entries=Object.entries||entries;



const propTypes = {
    activePage: React.PropTypes.string,
};

@international()
export default class NavMain extends Component
// function NavMain({ activePage })
{
    render() {
        const {activePage,translate}=this.props;
        return (
            <Navbar fixedTop className="container container-desktop container-lg"
                    style={{zIndex:'1060',opacity:'0.95',  marginTop:"0px", paddingLeft:"1px",paddingRight:"1px"}}>
                <Navbar.Header>
                    <Navbar.Brand>
                        <Link to="/">{translate(messages.application.title)}</Link>
                    </Navbar.Brand>
                    <Navbar.Toggle/>
                </Navbar.Header>
                <Navbar.Collapse>
                    <AbcNavItems/>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

NavMain.propTypes = propTypes;

// export default NavMain;
