import React,{ Component, createElement ,PropTypes} from 'react'
import ReactDOM from 'react-dom';

import {Field} from 'redux-form';
import classNames           from 'classnames'
import { ControlLabel, HelpBlock,FormControl,Col,
    Checkbox,ButtonToolbar,Button, Glyphicon } from '../abc-bootstrap'
import AbcCol from './AbcCol'
import AbcFormGroup from './AbcFormGroup'
import AbcFormControl from './AbcFormControl'

import AbcButton from './AbcButton'
import AbcControllerLabel from './AbcControllerLabel'
import AbcButtonToolbar from './AbcButtonToolbar'
import AbcRow,{AbcRowHorizontal} from './AbcRow'
import entries from 'lodash/entries'
import keys from 'lodash/keys'
Object.entries=Object.entries||entries;
Object.keys=Object.keys||keys;

// const renderFieldReadonly = ({ input, controlId,label,
//     type,placeholder,col,colLabel,colContent,colStyle,contentStyle,
//     colSize,labelSize,contentSize,
//     meta: { asyncValidating, touched, error,warning },...other }) => {
//     return (
//
//         <AbcCol {...col} colStyle={colStyle}>
//
//             <AbcCol {...colLabel}>{other.displayLabel&&label}</AbcCol>
//             <AbcCol {...colContent} colStyle={contentStyle}>
//                 <AbcControllerLabel
//                 >{other.data||input.value}</AbcControllerLabel>
//             </AbcCol>
//
//         </AbcCol>
//     )
// }
//
// const renderField = ({ input, controlId,label,
//     type,placeholder,col,colLabel,colContent,colStyle,contentStyle,
//     colSize,labelSize,contentSize,
//     meta: { asyncValidating, touched, error,warning } }) => {
//     return (
//         <AbcCol {...col} bsSize={colSize} colStyle={colStyle}>
//             <AbcFormGroup controlId={controlId}
//                           validationState={error&&error.flag||warning&&warning.flag||!error&&'success'}>
//
//                 <AbcCol {...colLabel}   bsSize={labelSize}>{label}</AbcCol>
//                 <AbcCol {...colContent} bsSize={contentSize} colStyle={contentStyle}>
//                     <AbcFormControl  {...input}  type={type}
//                                                  placeholder={placeholder}
//                     />
//                     <AbcFormControl.Feedback />
//                     <HelpBlock>
//                         {touched && ((error && <span>{error.message}</span>) ||
//                         (warning && <span>{warning.message}</span>))}
//                     </HelpBlock>
//                 </AbcCol>
//
//             </AbcFormGroup>
//         </AbcCol>
//     )
// }
//
// const renderCheckbox = ({ input, label,controlId,ref }) => {
//     return (
//         <Checkbox
//                 {...input}
//                 controlId={controlId}
//                 ref={ref}
//                 checked={input.value ? true : false}
//               >{label}
//         </Checkbox>
//     )
// }

export default class AbcColReduxFormHorizontal extends React.Component
{

    static propTypes =
    {
        controlId :PropTypes.string.isRequired,
        type:PropTypes.string.isRequired,
        label:PropTypes.string,
        placeholder:PropTypes.string.isRequired,
        col:PropTypes.object,
        colStyle:PropTypes.object,

        colLabel:PropTypes.object,
        labelStyle:PropTypes.object,

        colContent:PropTypes.object,
        contentStyle:PropTypes.object,

        colSize:PropTypes.string,
        labelSize:PropTypes.string,
        contentSize:PropTypes.string,

        ref:PropTypes.string,
        data:PropTypes.string
    }

    renderFieldReadonly = ({ input, controlId,label,
        type,placeholder,col,colLabel,colContent,colStyle,contentStyle,
        colSize,labelSize,contentSize,
        meta: { asyncValidating, touched, error,warning },...other }) => {
        return (

            <AbcCol {...col} colStyle={colStyle}>

                <AbcCol {...colLabel}>{other.displayLabel&&label}</AbcCol>
                <AbcCol {...colContent} colStyle={contentStyle}>
                    <AbcControllerLabel
                    >{other.data||input.value}</AbcControllerLabel>
                </AbcCol>

            </AbcCol>
        )
    }

    renderField = ({ input, controlId,label,
        type,placeholder,col,colLabel,colContent,colStyle,contentStyle,
        colSize,labelSize,contentSize,
        meta: { asyncValidating, touched, error,warning } }) => {
        return (
            <AbcCol {...col} bsSize={colSize} colStyle={colStyle}>
                <AbcFormGroup controlId={controlId}
                              validationState={error&&error.flag||warning&&warning.flag||!error&&'success'}>

                    <AbcCol {...colLabel}   bsSize={labelSize}>{label}</AbcCol>
                    <AbcCol {...colContent} bsSize={contentSize} colStyle={contentStyle}>
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


    static defaultProps =
    {
       col:{xs:12,xp:6, sm:6, md:5, lg:3},
        colLabel:{ componentClass:ControlLabel, xp:3,sm:3,md:3, lg:2},
        colContent:{xp:9,sm:9,md:9, lg:10},
        colSize:"abc-input",
        labelSize:"abc-input-label",
        contentSize:"abc-input-content",
        type:'text'
    }
    constructor(props, context)
    {
        super(props, context)
        // this.renderField     = this.renderField.bind(this);
        // this.renderFieldReadonly     = this.renderFieldReadonly.bind(this);
    }

    render()
    {
        const {controlId,type,placeholder,name,
            label,value,  ...other} = this.props;
        if(value) {
            return <Field
                name={name}
                controlId={controlId}
                component={this.renderField}
                type={type}
                label={label}
                value={value}
                placeholder={placeholder}
                { ...other}
            />
        }
        return <Field
            name={name}
            component={other.readonly?this.renderFieldReadonly:this.renderField}
            controlId={controlId}
            type={type}
            label={label}
            placeholder={placeholder}
            { ...other}
        />
    }
}

export class AbcColReduxFormImage extends React.Component{
    static defaultProps =
    {
        colSize:"abc-input-image",
        labelSize:"abc-input-image-label",
        contentSize:"abc-input-image-content",
    }
    render() {
        //pad竖屏为sm
        //pad横屏为md
        const col={xs:9,xp:5, sm:5, md:5, lg:5};

        return (
            <AbcColReduxFormHorizontal
                col={col}
                {...this.props} />
        )
    }
}

export class AbcColReduxFormHiddenLabel extends React.Component{
    static defaultProps =
    {
        colSize:"abc-input-image",
        labelSize:"abc-input-image-label",
        contentSize:"abc-input-image-content",
    }
    render() {
        //pad竖屏为sm
        //pad横屏为md
        const col={xs:6,xp:6, sm:6, md:6, lg:5};
        const colLabel={ componentClass:ControlLabel,vp:0,xs:3,xp:3,sm:3,md:2, lg:2,
            vpHidden:true,xpHidden:false,smHidden:false, mdHidden:false};
        const colContent={vp:12,xs:9, xp:9,sm:9,md:9, lg:10};
        return (
            <AbcColReduxFormHorizontal
                col={col}
                colLabel={colLabel}
                colContent={colContent}
                {...this.props} />
        )
    }
}

export class AbcColReduxFormFixedContent extends React.Component{
    static defaultProps =
    {
        colSize:"abc-input-image",
        labelSize:"abc-input-image-label",
        contentSize:"abc-input-image-content",
    }
    render() {
        //pad竖屏为sm
        //pad横屏为md
        const col={xs:6,xp:5, sm:5, md:5, lg:5};
        const colLabel={ componentClass:ControlLabel,vp:0,xs:3,xp:3,sm:3,md:3, lg:2,
            vpHidden:true,xpHidden:false,smHidden:false, mdHidden:false};
        const colContent={vp:12,xs:9, xp:9,sm:9,md:9, lg:10};
        return (
            <AbcColReduxFormHorizontal
                col={col}
                colLabel={colLabel}
                colContent={colContent}
                {...this.props} />
        )
    }
}


export class AbcColReduxFormCheckbox extends AbcColReduxFormHorizontal{
    // static propTypes =
    // {
    //     controlId :PropTypes.string.isRequired,
    //     type:PropTypes.string.isRequired,
    //     label:PropTypes.string.isRequired,
    //     col:PropTypes.object,
    //     colStyle:PropTypes.object,
    //     colLabel:PropTypes.object,
    //     labelStyle:PropTypes.object,
    //     colContent:PropTypes.object,
    //     contentStyle:PropTypes.object,
    //     colSize:PropTypes.string,
    //     labelSize:PropTypes.string,
    //     contentSize:PropTypes.string,
    //     ref:PropTypes.string,
    //     checked:PropTypes.bool
    // }
    static defaultProps =
    {
        col:{vp:12,xs:12,xp:6, sm:6, md:4, lg:2},
        colContent:{xp:9,xpOffset:3,vp:9,xpOffset:3 },
        labelContent:{},
        colSize:"abc-checkbox",
        labelSize:"abc-checkbox-label",
        contentSize:"abc-checkbox-content",
    }

    renderField = ({ input, label,controlId,ref,col,colContent,contentStyle }) => {
        return (
            <AbcCol {...col}>
                <AbcFormGroup controlId={controlId}>
                    <AbcCol {...colContent} colStyle={contentStyle}>
                        <Checkbox
                            {...input}
                            controlId={controlId}
                            ref={ref}
                            checked={input.value ? true : false}
                        >{label}
                        </Checkbox>
                    </AbcCol>
                </AbcFormGroup>
            </AbcCol>
        )
    }
}

export class AbcColReduxFormButtons extends AbcColReduxFormHorizontal{
    static propTypes =
    {
        controlId :PropTypes.string.isRequired,
        type:PropTypes.string.isRequired,
        label:PropTypes.string.isRequired,
        col:PropTypes.object,
        colContent:PropTypes.object,
        colStyle:PropTypes.object,
        colLabel:PropTypes.object,
        labelStyle:PropTypes.object,
        contentStyle:PropTypes.object,

        colSize:PropTypes.string,
        labelSize:PropTypes.string,
        contentSize:PropTypes.string,

        ref:PropTypes.string
    }
    static defaultProps =
    {
        col:{xs:12,xp:6, sm:6, md:6, lg:5},
        colContent:{xp:9,xpOffset:3,md:6,mdOffset:6,sm:9,smOffset:3,lg:10,lgOffset:2},

        colSize:"abc-button",
        labelSize:"abc-button-label",
        contentSize:"abc-button-content",
    }
    render(){
        const {col,colContent,contentStyle,colSize,labelSize,contentSize, ...other} = this.props;
        return (
            <AbcCol {...col} bsSize={colSize}>
                    <AbcRow>
                        <AbcCol {...colContent} bsSize={contentSize}  colStyle={contentStyle}>
                            <AbcButtonToolbar  style={{marginLeft:"-20px"}}>
                                <AbcButton>确定</AbcButton>
                                <AbcButton>取消</AbcButton>
                                <AbcButton>重置</AbcButton>
                                <HelpBlock></HelpBlock>
                            </AbcButtonToolbar>
                        </AbcCol>
                    </AbcRow>
            </AbcCol>
        )
    }
}

export class AbcColReduxFormButtonIcons extends AbcColReduxFormHorizontal{
    static propTypes =
    {
        controlId :PropTypes.string.isRequired,
        type:PropTypes.string.isRequired,
        label:PropTypes.string.isRequired,
        col:PropTypes.object,
        colContent:PropTypes.object,

        colSize:PropTypes.string,
        labelSize:PropTypes.string,
        contentSize:PropTypes.string,

        ref:PropTypes.string
    }
    static defaultProps =
    {
        //xs={12} xp={6} sm={6} lg={3}
        col:{xs:12,xp:6, sm:6, md:4, lg:3},
        // xpOffset={3} xp={9}
        colContent:{xp:9,xpOffset:3},

        colSize:"abc-button-icons",
        labelSize:"abc-button-icons-label",
        contentSize:"abc-button-icons-content",

        type:'button'
    }
    render(){
        const {col,colContent,colSize,labelSize,contentSize, ...other} = this.props;
        return (
            <AbcCol {...col} bsSize={colSize}>

                    <AbcCol {...colContent} bsSize={contentSize} >
                        <ButtonToolbar className="toolbar-icon-abc">
                            <Button className="thumbnail-btn">
                                <Glyphicon glyph="save"/></Button>
                            <Button className="thumbnail-btn">
                                <Glyphicon glyph="plus"/></Button>
                            <Button className="thumbnail-btn">
                                <Glyphicon glyph="pencil"/></Button>
                            <Button className="thumbnail-btn">
                                <Glyphicon glyph="trash"/></Button>

                        </ButtonToolbar>
                    </AbcCol>
   
            </AbcCol>
        )
    }
}