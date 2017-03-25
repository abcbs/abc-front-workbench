import React from 'react';
import baseTheme from 'material-ui/styles/baseThemes/darkBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import AppBar from 'material-ui/AppBar';

class MainBaseTheme extends React.Component {
    getChildContext() {
        return {muiTheme: getMuiTheme(baseTheme)};
    }

    render () {
        return <AppBar title="My AppBar" />;
    }
}

MainBaseTheme.childContextTypes = {
    muiTheme:React.PropTypes.object.isRequired
};

export default MainBaseTheme;
