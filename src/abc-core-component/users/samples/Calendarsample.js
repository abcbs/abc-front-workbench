import React, { Component, PropTypes } from 'react'

import {ButtonGroup,Button,Checkbox,Col,Row ,Panel} from '../../../abc-bootstrap'
import {AbcPanel,AbcRow,AbcFormHorizontal} from '../../../abc-ui/abc-ui-index'
import globalizeLocalizer from '../../../abc-widgets/localizers/globalize';
import {Calendar as Calendar} from '../../../abc-widgets/abc-widgets-index';

var RW          = require('react-widgets');
// var globalizeLocalizer = require('react-widgets/lib/localizers/globalize');

var Globalize = require ( 'globalize');
// Globalize.locale('zh-CN');
// import Calendar from 'react-widgets/lib/Calendar';

globalizeLocalizer(Globalize);

require('globalize/lib/cultures/globalize.culture.zh');
require('globalize/lib/cultures/globalize.culture.es');
require('globalize/lib/cultures/globalize.culture.en-GB');

export  default class Calendarsample extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      format: '',
      footer: true,
      culture:'zh',
      disabled:false,
      isRtl:false
    }
  }
  render(){
    let cultures = ['zh','es','en-GB'];
    const RW_Calendar=Calendar;
    return (
        <AbcPanel>
          <AbcRow>
            <div className='col-md-6 col-lg-7 demo'>
              <RW_Calendar
                  value={this.state.value}
                  onChange={this._change}
                  max={this.state.max}
                  min={this.state.min}
                  culture={this.state.culture}
                  footer={this.state.footer}
                  finalView={this.state.finalView}
                  initialView={this.state.initialView}
                  disabled={this.state.disabled === 'disabled'}
                  readOnly={this.state.disabled === 'readonly'}
                  isRtl={this.state.isRtl}/>
            </div>
            <div className='col-md-6 col-lg-5 api-panel'>
              <div style={{marginLeft:"1rem"}}>
              <div className='form-group' style={{marginLeft:"1rem"}}>
                <label className='checkbox-inline'>
                  <input type='checkbox'
                         checked={!!this.state.isRtl}
                         onChange={this._set.bind(this, 'isRtl', !this.state.isRtl)}/>
                  Right to Left
                </label>
              </div>
              <div className='form-group' style={{marginLeft:"1rem"}}>
                <ButtonGroup>
                  <Button
                      active={this.state.disabled === 'disabled'}
                      onClick={this.disabled.bind(this)}>
                    Disable
                  </Button>
                  <Button
                      active={this.state.disabled === 'readonly'}
                      onClick={this.readOnly.bind(this)}>
                    Readonly
                  </Button>
                </ButtonGroup>
              </div>
              <AbcRow>
                <div className='form-group col-xs-6' >
                  <label className='control-label'>culture</label>
                  <RW.DropdownList
                      value={this.state.culture || cultures[0]}
                      data={cultures}
                      onChange={this._set.bind(this, 'culture')}/>
                </div>
                <div className='form-group col-xs-6'>
                  <label className='control-label'>&nbsp;</label>
                  <div className='checkbox'>
                    <label>
                      <input type='checkbox'
                             checked={this.state.footer}
                             onChange={this._set.bind(this, 'footer', !this.state.footer)}/>
                      Footer
                    </label>
                  </div>
                </div>
              </AbcRow>
              <AbcRow>
                <div className='form-group col-xs-6'>
                  <label className='form-label'>Initial View</label>
                  <RW.DropdownList
                      value={this.state.initialView || 'month'}
                      data={["month", "year", "decade", "century"]}
                      onChange={this._set.bind(this, 'initialView')}/>
                </div>
                <div className='form-group col-xs-6'>
                  <label className='form-label'>Final View</label>
                  <RW.DropdownList
                      value={this.state.finalView || 'century'}
                      data={["month", "year", "decade", "century"]}
                      onChange={this._set.bind(this, 'finalView')}/>
                </div>
              </AbcRow>
              <AbcRow>
                <div className='form-group col-xs-6'>
                  <label className='control-label'>min</label>
                  <RW.DateTimePicker
                      time={false}
                      culture={this.state.culture}
                      // format='MMM dd, yyyy'
                      format= "yyyy'年'MM'月'd'日'"
                      // format="yyyy'年'M'月'd'日'"
                      footer={false}
                      value={this.state.min}
                      onChange={this._set.bind(this, 'min')}/>
                </div>
                <div className='form-group col-xs-6'>
                  <label className='control-label'>max</label>
                  <RW.DateTimePicker
                      time={false}
                      culture={this.state.culture}
                      // format='MMM dd yyyy'
                      format="yyyy-MM-dd"
                      value={this.state.max}
                      footer={false}
                      onChange={this._set.bind(this, 'max')}/>
                </div>
              </AbcRow>
              </div>
            </div>
          </AbcRow>
        </AbcPanel>
    )
  }

  _change(val){
    this.setState({ value: val })
  }

  _set(field, value){
    var obj = {}
    obj[field] = value
    this.setState(obj)
  }

  readOnly(){
    var val = this.state.disabled === 'readonly' ? false : 'readonly'
    this.setState({ disabled: val })
  }

  disabled(){
    var val = this.state.disabled === 'disabled' ? false : 'disabled'
    this.setState({ disabled: val })
  }

}
