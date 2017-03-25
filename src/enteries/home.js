import React from 'react';
import { render } from 'react-dom'
import { defineMessages }              from 'react-intl'

import AbcContainer from '../abc-framework/ui/AbcContainerWrape'
import AbcPage from '../abc-framework/ui/AbcContainerFramePage'
import {Label,Badge,ButtonToolbar,Button,Checkbox} from '../abc-bootstrap'

import 'bootstrap/less/theme.less'
import 'bootstrap/less/bootstrap.less';
import international from '../abc-framework/international/internationalize'

const messages = defineMessages
({
    title:
    {
        id             : 'menu',
        description    : 'Menu page header',
        defaultMessage : 'Menu'
    }
})

@international()
class Home extends React.Component {
    handleClick(e) {
        console.log("e,",e.target.value);
    }
    render() {
        var root=$("root");
        //label-primary-bg
        //this.props.translate(layout_messages.title)
        return (
            <AbcPage title={this.props.translate(messages.title)} router="home" subTitle="欢迎光临">
                <AbcContainer>
                    <div>
                        <Checkbox onClick={this.handleClick.bind(this)}></Checkbox>
                        <Label bsStyle="abc" bsSize="bg">test</Label>
                        <ButtonToolbar style={{ position: 'relative' ,display:'inline-block'}}>
                            <Button type="button" bsStyle="default" style={{ position: 'relative'}}>
                                确定
                            </Button><Badge bsStyle="info" bsSize="abc">4</Badge>
                        </ButtonToolbar>
                        <ButtonToolbar style={{ position: 'relative'}}>
                            Messages<Badge bsStyle="abc">17</Badge>
                        </ButtonToolbar>
                    </div>
                </AbcContainer>

            </AbcPage>
        );
    }
}

// render(
//     <Home/>,
//     document.getElementById('home'));
