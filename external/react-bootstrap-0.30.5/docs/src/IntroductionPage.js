import React from 'react';

import CodeExample from './CodeExample';
import NavMain from './NavMain';
import PageHeader from './PageHeader';
import PageFooter from './PageFooter';

const IntroductionPage = React.createClass({
  render() {
    return (
      <div>
        <NavMain activePage="introduction" />

        <PageHeader
          title="Introduction"
          subTitle="The most popular front-end framework, rebuilt for React."/>

        <div className="container bs-docs-container">
          <div className="row">
            <div className="col-md-9" role="main">
              <div className="bs-docs-section">
                <p className="lead">
                  React-Bootstrap is a library of reusable front-end components.
                  You'll get the look-and-feel of Twitter Bootstrap,
                  but with much cleaner code, via Facebook's React.js framework.
                </p>

                <div className="highlight">
                  <CodeExample
                    mode="javascript"
                    codeText={
`button(size=SMALL, color=GREEN, text="Something", onClick=someCallback)`
                    }
                  />
                </div>

                <div className="highlight">
                  <CodeExample
                    mode="javascript"
                    codeText={
`<Button bsStyle="success" bsSize="small" onClick={someCallback}>
  Something
</Button>`
                    }
                  />
                </div>


                <div className="highlight">
                  <CodeExample
                    mode="javascript"
                    codeText={
`var button = React.DOM.button({
  className: "btn btn-lg btn-success",
  children: "Register"
});

React.render(button, mountNode);`
                    }
                  />
                </div>

              </div>
            </div>
          </div>
        </div>
        <PageFooter />
      </div>
    );
  }
});

export default IntroductionPage;
