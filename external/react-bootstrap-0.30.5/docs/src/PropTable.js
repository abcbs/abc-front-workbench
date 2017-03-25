import merge from 'lodash/merge';
import React from 'react';

import {Glyphicon} from 'react-bootstrap';
import {Label} from 'react-bootstrap';
import {Table} from 'react-bootstrap';
import {capitalize} from 'react-bootstrap';

function cleanDocletValue(str) {
  return str.trim().replace(/^\{/, '').replace(/\}$/, '');
}

function getPropsData(component, metadata) {
  let componentData = metadata[component] || {};
  let props = componentData.props || {};

  if (componentData.composes) {
    componentData.composes.forEach(other => {
      if (other !== component) {
        props = merge({}, getPropsData(other, metadata), props);
      }
    });
  }

  if (componentData.mixins) {
    componentData.mixins.forEach( other => {
      if (other !== component && componentData.composes.indexOf(other) === -1) {
        props = merge({}, getPropsData(other, metadata), props);
      }
    });
  }

  return props;
}


const PropTable = React.createClass({

  contextTypes: {
    metadata: React.PropTypes.object
  },

  componentWillMount() {
    this.propsData = getPropsData(this.props.component, this.context.metadata);
  },

  render() {
    let propsData = this.propsData;

    if (!Object.keys(propsData).length) {
      return <div className="text-muted"><em>There are no public props for this component.</em></div>;
    }

    return (
      <Table bordered striped className="prop-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Type</th>
            <th>Default</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          { this._renderRows(propsData) }
        </tbody>
      </Table>
    );
  }

});


export default PropTable;
