import React, {Component, PropTypes} from 'react';
import Drawer from 'material-ui/Drawer';
import AppBar from 'material-ui/AppBar';
import RaisedButton from 'material-ui/RaisedButton';


import {deepOrange500} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 200,
    },
};

const muiTheme = getMuiTheme({
    palette: {
        accent1Color: deepOrange500,
    },
    prepareStyles:{
        textAlign: 'center',
        paddingTop: 200,
    }
});


export default class DrawerOpenRightExample extends React.Component {
    getChildContext() {
        return {
            muiTheme:muiTheme
        };
    }



    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});

    render() {
        return (
            <div>
                <RaisedButton
                    label="Toggle Drawer"
                    onTouchTap={this.handleToggle}
                />
                <Drawer width={200} openSecondary={true} open={this.state.open} >
                    <AppBar title="AppBar" />
                </Drawer>
            </div>
        );
    }
}

DrawerOpenRightExample.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};