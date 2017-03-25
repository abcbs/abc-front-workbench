import React,{ Component, createElement ,PropTypes} from 'react'
import {Field} from 'redux-form';
import classNames           from 'classnames'
import { ControlLabel, HelpBlock,FormControl,Col} from '../abc-bootstrap'
import AbcCol from './AbcCol'
import AbcFormGroup from './AbcFormGroup'
import AbcFormControl from './AbcFormControl'
import entries from 'lodash/entries'
import keys from 'lodash/keys'
Object.entries=Object.entries||entries;
Object.keys=Object.keys||keys;

export default class AbcCol233WL extends React.Component
{
    static propTypes =
    {
        controlId :PropTypes.string.isRequired,
        type:PropTypes.string.isRequired,
        validationState :PropTypes.func.isRequired,
        handleChange :PropTypes.func.isRequired,
        help:PropTypes.string.isRequired,
        label:PropTypes.string,
        placeholder:PropTypes.string.isRequired,
        col:PropTypes.object,
        col_lable:PropTypes.object,
        col_content:PropTypes.object,
        ref:PropTypes.string
    }

    static defaultProps =
    {
        //xs={6} sm={4} md={4} lg={4}
        col:{xs:12, xp:6,sm:4, md:4, lg:4,xsHidden:false},
        //md={2} lg={2} xsHidden ={true} smHidden ={true}
        colLable:{md:2, lg:2, xsHidden :true, smHidden :true},
        //xs={12} sm={12} md={10} lg={10}
        colContent:{xs:12, sm:12, md:10, lg:10},
        type:'text'
    }


    render()
    {
        const {controlId, type,validationState,handleChange,placeholder,
            label, help,col,colLable,colContent,ref, ...other} = this.props
         return (//[linkName, {path, title}]
            <AbcCol
                {...col
                }
            >
                <AbcFormGroup controlId={controlId}
                              validationState={validationState}>
                    <AbcCol
                        {...colLable}
                     >
                        <ControlLabel style={{marginTop: "6px"}}>{label}</ControlLabel>
                    </AbcCol>
                    <AbcCol {...colContent}>
                        <AbcFormControl type={type}
                                        placeholder={placeholder}
                                        onChange={handleChange}
                            {...other}
                        />
                        <FormControl.Feedback />
                        {<HelpBlock>{help}</HelpBlock>}
                    </AbcCol>
                </AbcFormGroup>
            </AbcCol>
        );
    }
}

export class AbcCol233WLA extends React.Component{
    render() {
        return (
            <AbcCol233WL
                {...this.props} />
        )
    }

}

export class AbcCol233WLB extends React.Component{
    render() {
        const col={xs:12,xp:6, sm:4, md:4, lg:4,smHidden:false};
        const colLabel={md:2, lg:2 ,xsHidden:true ,smHidden :true};
        const colContent={xs:12, sm:12, md:10, lg:10};
        return (
            <AbcCol233WL
                col={col}
                colLabel={colLabel}
                colContent={colContent}
                {...this.props} />
        )
    }

}

export class AbcCol233WLC extends React.Component{
    render() {
        const col={xs:0,xp:6,sm:4, md:4, lg:4,xsHidden:true};
        const colLabel={md:2, lg:2 ,xsHidden:true ,smHidden :true};
        const colContent={xs:12, sm:12, md:10, lg:10};
        return (
            <AbcCol233WL
                col={col}
                colLabel={colLabel}
                colContent={colContent}
                {...this.props} />
        )
    }

}