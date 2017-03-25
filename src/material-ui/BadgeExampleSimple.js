import React from 'react';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NotificationsIcon from 'material-ui/svg-icons/social/notifications';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {deepOrange500} from 'material-ui/styles/colors';
import {red50} from 'material-ui/styles/colors';
import getMuiTheme from 'material-ui/styles/getMuiTheme';


const styles = {
    container: {
        textAlign: 'center',
        paddingTop: 200,
    },
};

const muiTheme =getMuiTheme({
    palette: {
        accent1Color: deepOrange500

    },
    badge:{//primaryColor
        primaryColor:red50,
        primaryTextColor:deepOrange500,
        color:deepOrange500,
        textColor:red50
    }
});

//const BadgeExampleSimple = (muiTheme,styles) => (
export default class BadgeExampleSimple extends React.Component {
    render() {
        return (

            <MuiThemeProvider muiTheme={muiTheme}>
                <div style={styles.container}>
                    <Badge
                        badgeContent={4}
                        primary={true}
                        muiTheme={muiTheme}
                    >
                        <NotificationsIcon />
                    </Badge>
                    <Badge
                        badgeContent={10}
                        secondary={true}
                        badgeStyle={{top: 12, right: 12}}
                        muiTheme={muiTheme}
                    >
                        <IconButton tooltip="Notifications">
                            <NotificationsIcon />
                        </IconButton>
                    </Badge>
                </div>
            </MuiThemeProvider>
        );
    }
    getChildContext() {
        return {
            muiTheme:muiTheme
        };
    }
};

BadgeExampleSimple.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};




