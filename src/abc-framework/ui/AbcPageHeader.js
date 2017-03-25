import React from 'react';
import {ControlLabel} from '../../abc-bootstrap'
import Devices from '../../abc-framework/utils/Devices'
const PageHeader = React.createClass({
    render() {
        return (
            <div className="container container-desktop container-lg">
                <ControlLabel style={{lineHeight:'40px'}}>{this.props.title}</ControlLabel>
                 <span style={{position:"relative",float:"right",
                 lineHeight:'40px'}}>{this.props.subTitle}</span>
               
            </div>

        );
    }
});

export default PageHeader;
