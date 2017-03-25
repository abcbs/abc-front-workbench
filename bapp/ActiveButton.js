
define(['react','react-dom','react-bootstrap/lib/ButtonToolbar',
    'react-bootstrap/lib/Button'], function(React,ReactDom,ButtonToolbar,Button) {
    const buttonsInstance = (
        <ButtonToolbar>
            <Button bsStyle="primary" bsSize="large" active>Primary button</Button>
            <Button bsSize="large" active>Button</Button>
        </ButtonToolbar>
    );

  ReactDom.render(buttonsInstance, document.getElementById('appButton'));

});

