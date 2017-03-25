import React from 'react';

import NavMain from './NavMain';
import PageFooter from './PageFooter';
import {Grid} from 'react-bootstrap';
import {Alert} from 'react-bootstrap';
import {Glyphicon} from 'react-bootstrap';
import {Label} from 'react-bootstrap';

export default class HomePage extends React.Component {
  render() {
    return (
      <div>
        <NavMain activePage="home" />

        <main className="bs-docs-masthead" id="content" role="main">
          <div className="container">
            <span className="bs-docs-booticon bs-docs-booticon-lg bs-docs-booticon-outline"></span>
            <p className="lead">The most popular front-end framework, rebuilt for React.</p>
          </div>
        </main>

        <Grid>
          <Alert bsStyle="warning">
            <p><Glyphicon glyph="bullhorn" /> We are actively working to reach a 1.0.0 release, and we would love your help to get there.</p>
            </Alert>
        </Grid>

        <PageFooter />
      </div>
    );
  }
}
