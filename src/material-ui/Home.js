import React from 'react'
import { Link } from 'react-router'
import Home from './Home'

export default React.createClass({
    render() {
        console.log("test");
        return (
            <div>
                <h1>React Router Tutorial</h1>
                <ul role="nav">
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/main">main</Link></li>
                    <li><Link to="/toolbar">ToolBar</Link></li>
                    <li><Link to="/autocomplete">autocomplete</Link></li>
                    <li><Link to="/avatar">avatar</Link></li>
                    <li><Link to="/badge">badge</Link></li>
                    <li><Link to="/bainBaseTheme">bainBaseTheme</Link></li>
                    <li><Link to="/drawer">drawer</Link></li>
                    <li><Link to="/drawer">drawer</Link></li>
                </ul>
                {this.props.children}
            </div>
        )
    }
})
