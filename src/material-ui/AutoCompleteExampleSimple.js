import React from 'react';
import AutoComplete from 'material-ui/AutoComplete';

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

export default class AutoCompleteExampleSimple extends React.Component {
    contextTypes: {
        muiTheme: React.PropTypes.object.isRequired
        }

    constructor(props, context) {
        super(props, context);


        this.state = {
            dataSource: [],
        };
    }
    getChildContext() {
        return {
            muiTheme:muiTheme
        };
    }

    handleUpdateInput = (value) => {
        this.setState({
            dataSource: [
                value,
                value + value,
                value + value + value,
            ],
        });
    };

    render() {
        return (
            <div>
                <AutoComplete
                    hintText="Type anything"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                    muiTheme={muiTheme}
                    prepareStyles={styles.container}
                />
                <AutoComplete
                    hintText="Type anything"
                    dataSource={this.state.dataSource}
                    onUpdateInput={this.handleUpdateInput}
                    floatingLabelText="Full width"
                    fullWidth={true}
                    muiTheme={muiTheme}
                    prepareStyles={styles.container}
                />
            </div>
        );
    }
}
AutoCompleteExampleSimple.childContextTypes = {
    muiTheme: React.PropTypes.object.isRequired
};