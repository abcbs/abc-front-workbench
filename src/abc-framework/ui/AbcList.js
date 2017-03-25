import React, { Component ,createElement} from 'react'
import hoist_statics from 'hoist-non-react-statics'
import {ListGroup} from 'react-bootstrap'
const defualt_className="container";
export default function list(options:{})
{
    const _className =options&&options.className||defualt_className,
        _style =options&&options.style||{marginTop:'0px'};
    //
    return function(WrappedComponent)
    {
        const connectDisplayName = `AbcList(${getDisplayName(WrappedComponent)})`
        class AbcList extends Component {

            render() {
                require('../../../resource/styles/css/index.css');
                return (
                    <ListGroup className="todo-list" componentClass="ul">
                        <WrappedComponent {...this.props}/>
                    </ListGroup>
                )
            }
        }
        //
        AbcList.displayName = connectDisplayName
        AbcList.WrappedComponent = WrappedComponent
        return hoist_statics(AbcList, WrappedComponent)
    }
}

function getDisplayName(WrappedComponent) {
    return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}