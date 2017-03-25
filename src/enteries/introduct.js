import React from 'react';
import { render } from 'react-dom'
import AbcContainer from '../abc-framework/ui/AbcContainerWrape'
import AbcPage from '../abc-framework/ui/AbcContainerFramePage'

const Introduct = React.createClass({
    render() {
        return (
            <AbcPage title="展示互动" subTitle="欢迎光临">
                <AbcContainer>
                    <p>
                        Hello,商品介绍
                    </p>
                </AbcContainer>
            </AbcPage>
        );
    }
});
//
// render(
//     <Introduct/>,
//     document.getElementById('introduct'));
