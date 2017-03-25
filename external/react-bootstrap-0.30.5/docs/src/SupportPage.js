import React from 'react';

import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

export default class Page extends React.Component {
  render() {
    return (
        <div>
          <NavMain activePage="support" />

          <PageHeader
            title="Need help?"
            subTitle="Community resources for answering your React-Bootstrap questions." />

          <div className="container bs-docs-container">
            <div className="row">
              <div className="col-md-9" role="main">
                <div className="bs-docs-section">
                 ffff
                </div>
              </div>
            </div>
          </div>

          <PageFooter />
        </div>
      );
  }

  shouldComponentUpdate() {
    return false;
  }
}
