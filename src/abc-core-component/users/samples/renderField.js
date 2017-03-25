import React,{ Component, createElement ,PropTypes} from 'react'
import ReactDOM from 'react-dom';

import {Field} from 'redux-form';
import classNames           from 'classnames'
import { ControlLabel, HelpBlock,FormControl,Col,
    Checkbox,ButtonToolbar,Button, Glyphicon }   from '../../../abc-bootstrap'
import AbcCol from '../../../abc-ui/AbcCol'
import AbcFormGroup from '../../../abc-ui/AbcFormGroup'
import AbcFormControl from '../../../abc-ui/AbcFormControl'

import AbcButton from '../../../abc-ui/AbcButton'
import AbcControllerLabel from '../../../abc-ui/AbcControllerLabel'
import AbcButtonToolbar from '../../../abc-ui/AbcButtonToolbar'
import AbcRow,{AbcRowHorizontal} from '../../../abc-ui/AbcRow'
import entries from 'lodash/entries'
import keys from 'lodash/keys'
Object.entries=Object.entries||entries;
Object.keys=Object.keys||keys;

// const renderField = ({ input, label, type, meta: { touched, error } }) => (
//   <div>
//     <label>{label}</label>
//     <div>
//       <input {...input} placeholder={label} type={type}/>
//       {touched && error && <span>{error}</span>}
//     </div>
//   </div>
// )

const col={xs:6,xp:6, sm:6, md:6, lg:5};
const colLabel={ componentClass:ControlLabel,vp:0,xs:3,xp:3,sm:3,md:2, lg:2,
    vpHidden:true,xpHidden:false,smHidden:false, mdHidden:false};
const colContent={vp:12,xs:9, xp:9,sm:9,md:9, lg:10};

const renderField = ({ input, controlId,label,
    type,placeholder,col,colLabel,colContent,colStyle,contentStyle,
    colSize,labelSize,contentSize,
    meta: { asyncValidating, touched, error,warning } })=> (
// const renderField = ({ input, label, type, meta: { touched, error } }) => (

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

export default renderField
