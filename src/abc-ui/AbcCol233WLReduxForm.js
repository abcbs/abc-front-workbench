import React,{ Component, createElement ,PropTypes} from 'react'
import {Field} from 'redux-form';
import classNames           from 'classnames'
import { ControlLabel, HelpBlock,FormControl,Col} from '../abc-bootstrap'
import AbcCol from './AbcCol'
import AbcFormGroup from './AbcFormGroup'
import AbcFormControl from './AbcFormControl'
import AbcControllerLabel from './AbcControllerLabel'
import entries from 'lodash/entries'
import keys from 'lodash/keys'
Object.entries=Object.entries||entries;
Object.keys=Object.keys||keys;

export default class AbcCol233WLReduxForm extends React.Component
{
    static propTypes =
    {
        controlId :PropTypes.string.isRequired,
        type:PropTypes.string.isRequired,
        label:PropTypes.string,
        placeholder:PropTypes.string.isRequired,
        col:PropTypes.object,
        colLabel:PropTypes.object,
        colContent:PropTypes.object,
        ref:PropTypes.string,
        data:PropTypes.string
    }

    static defaultProps =
    {
        //xs={6} sm={4} md={4} lg={4}
        col:{xs:6, sm:4, md:4, lg:4,xsHidden:false},
         //md={2} lg={2} xsHidden ={true} smHidden ={true}
        colLabel:{md:2, lg:2, xsHidden :true, smHidden :true},
        //xs={12} sm={12} md={10} lg={10}
        colContent:{xs:12, sm:12, md:10, lg:10},
        type:'text'
    }

    renderField = ({ input, controlId,label,
        type,placeholder,col,colLabel,colContent,colStyle,
        meta: { asyncValidating, touched, error,warning } }) => {
        return (
            <AbcCol {...col} colStyle={colStyle}
            >
            <AbcFormGroup controlId={controlId}
                 validationState={error&&error.flag||warning&&warning.flag||!error&&'success'}>
                <AbcCol
                    {...colLabel}
                >
                <ControlLabel style={{marginTop: "6px"}}>{label}</ControlLabel>
                </AbcCol>
                 <AbcCol {...colContent}>
                    <AbcFormControl  {...input}  type={type}
                                       placeholder={placeholder}
                    />

                    <AbcFormControl.Feedback />
                    <HelpBlock>
                        {touched && ((error && <span>{error.message}</span>) ||
                        (warning && <span>{warning.message}</span>))}
                    </HelpBlock>
                </AbcCol>
            </AbcFormGroup>
            </AbcCol>
        )
    }

    renderFieldReadonly = ({ input, controlId,label,
        type,placeholder,col,colLabel,colContent,colStyle,
        meta: { asyncValidating, touched, error,warning },...other }) => {
        return (

            <AbcCol {...col} colStyle={colStyle}>
                <AbcCol {...colLabel}>
                   <ControlLabel style={{marginTop: "6px"}}>{other.displayLabel&&label}</ControlLabel>
                </AbcCol>
               <AbcCol {...colContent}>
                <AbcControllerLabel
                          >{other.data||input.value}</AbcControllerLabel>
                </AbcCol>
            </AbcCol>
        )
    }
    render()
    {
        const {controlId,type,placeholder,name,
            label,value,  ...other} = this.props;
        if(value) {
            return <Field
                    name={name}
                    controlId={controlId}
                    component={this.renderFieldReadonly}
                    type={type}
                    label={label}
                    value={value}
                    placeholder={placeholder}
                    { ...other}
                />
        }
        return <Field
                name={name}
                component={other.readonly? this.renderFieldReadonly:this.renderField}
                controlId={controlId}
                type={type}
                label={label}
                placeholder={placeholder}
                { ...other}
            />


    }
}

export class AbcCol233WLA extends React.Component{
    render() {
        const col={xs:6, sm:4, md:4, lg:4,xsHidden:false};
        // const col={xs:12,xp:6, sm:4, md:4, lg:4,smHidden:false};
        const colLable={md:2, lg:2, xsHidden :true, smHidden :true};
        const colContent={xs:12, sm:12, md:10, lg:10};
        return (
            <AbcCol233WLReduxForm {...this.props} />
        )
    }
}

export class AbcCol233WLB extends React.Component{
    render() {
        const col={xs:6, sm:4, md:4, lg:4,xsHidden:false};
        const colLabel={md:2, lg:2 ,xsHidden:true ,smHidden :true};
        const colContent={xs:12, sm:12, md:10, lg:10};
        return (
            <AbcCol233WLReduxForm
                col={col} colLabel={colLabel}  colContent={colContent}
                {...this.props} />
        )
    }

}

export class AbcCol233WLC extends React.Component{
    render() {
        const col={xs:0,sm:4, md:4, lg:4,xsHidden:true};
        const colLabel={md:2, lg:2 ,xsHidden:true ,smHidden :true};
        const colContent={xs:12, sm:12, md:10, lg:10};
        return (
            <AbcCol233WLReduxForm
                col={col}
                colLabel={colLabel}
                colContent={colContent}
                {...this.props} />
        )
    }

}

//单行
export class AbcCol233WLD extends React.Component{
    render() {
        // const col={xs:6, sm:4, md:4, lg:4,xsHidden:false};
        const col={xs:12,xp:6, sm:4, md:4, lg:4,xsHidden:false};
        const colLabel={xs:2,sm:2,md:2, lg:2,xsHidden :false, smHidden :false};
        const colContent={xs:10,sm:10, md:10, lg:10};
        return (//colLable
            <AbcCol233WLReduxForm
                col={col} colLabel={colLabel}  colContent={colContent}
                {...this.props} />
        )
    }

}
//隐藏Lable
export class AbcColHiddenLabelA extends React.Component{

    render() {
        const col={xs:12, xp:6,sm:4, md:4, lg:4,xsHidden:false};
        const colLabel={md:2, lg:2, xsHidden :true, smHidden :true};
        const colContent={xs:12, sm:12, md:10, lg:10};
        return(
            <AbcCol233WLReduxForm
                col={col}
                colLabel={colLabel}
                colContent={colContent}
                {...this.props} />
        )
    }

}

export class AbcColHiddenLabelC extends React.Component{
    render() {
        const col={xs:0,xp:6,sm:4, md:4, lg:4,xsHidden:true};
        const colLabel={md:2, lg:2 ,xsHidden:true ,smHidden :true};
        const colContent={xs:12, sm:12, md:10, lg:10};
        return (
            <AbcCol233WLReduxForm
                col={col}
                colLabel={colLabel}
                colContent={colContent}
                {...this.props} />
        )
    }

}

export class AbcColHiddenLabelImage extends React.Component{
    render() {
        //const col={xs:12, xp:6,sm:4, md:4, lg:4,xsHidden:false};
        const col={xs:9,xp:5, sm:5, md:5, lg:5,smHidden:false};
        const colLabel={md:2, lg:2 ,xsHidden:true ,smHidden :true};
        const colContent={xs:11, sm:12, md:10, lg:10};
        return (
            <AbcCol233WLReduxForm
                col={col}
                colLabel={colLabel}
                colContent={colContent}
                {...this.props} />
        )
    }

}