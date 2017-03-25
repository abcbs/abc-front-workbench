import React from 'react'
import { Field, reduxForm } from 'redux-form'
import {AbcPanel,AbcRow,AbcFormHorizontal} from '../../../abc-ui/abc-ui-index'
import UserSearchHeader from '../../../abc-ui/AbcPanelHeaderTitleAndNumber'
import DropdownList from 'react-widgets/lib/DropdownList'
import SelectList from 'react-widgets/lib/SelectList'
import Multiselect from 'react-widgets/lib/Multiselect'


// import 'react-widgets/lib/less/react-widgets.less'

import '../../../../resource/styles/abc-widgets/less/abc-widgets.less'
var Globalize = require ( 'globalize');

var globalizeLocalizer = require('react-widgets/lib/localizers/globalize');
require('globalize/lib/cultures/globalize.culture.zh-CN');

var gl= new Globalize();
globalizeLocalizer(Globalize);

import numberLocalizer from '../../../abc-widgets/localizers/simple-number'
import Calendarsample from './Calendarsample'
import ComboboxSample from './ComboboxSample'
import DateTimePicker from './DateTimePicker'
import numberpickerSample from './numberpicker'
import  SelectlistSample from './SelectlistSample'
// import DateTimePicker from './DateTimePicker'

numberLocalizer();


const colors = [ { color: 'Red', value: 'ff0000' },
  { color: 'Green', value: '00ff00' },
  { color: 'Blue', value: '0000ff' } ]

const renderDropdownList = ({ input, ...rest }) =>
  <DropdownList {...input} {...rest}/>

const  messages= {
    open: '下拉',
    filterPlaceholder: '',
    emptyList:   '无选项条目',
    emptyFilter: '没有结果',
}
const renderMultiselect = ({ input, ...rest }) =>
  <Multiselect {...input}
    onBlur={() => input.onBlur()}
    messages={messages}
    value={input.value || []} // requires value to be an array
    {...rest}/>

const renderSelectList = ({ input, ...rest }) =>
  <SelectList {...input} onBlur={() => input.onBlur()} {...rest}/>

let ReactWidgetsForm = props => {
  const { handleSubmit, pristine, reset, submitting } = props
    const reactHeader=(<UserSearchHeader numbers="-" title="Widgets测试"/>);
    const calendarHeader=(<UserSearchHeader numbers="-" title="Widgets-日期"/>);
    const comboboxHeader=(<UserSearchHeader numbers="-" title="Widgets-下拉"/>);
    const selectsHeader=(<UserSearchHeader numbers="-" title="Widgets-多选与单选"/>);

    return (
      <AbcPanel>
      <AbcPanel header={calendarHeader}>
          <AbcRow>

              <div>
                  <Calendarsample />
              </div>

              </AbcRow>
      </AbcPanel>
          <AbcPanel header={comboboxHeader}>
              <AbcRow>
                  <div>
                      <ComboboxSample/>
                  </div>
              </AbcRow>
          </AbcPanel>
          <AbcPanel header={selectsHeader}>
              <AbcRow>
                  <div>
                      <SelectlistSample/>
                  </div>
              </AbcRow>
          </AbcPanel>
      <AbcPanel header={reactHeader}>
      <AbcRow>
            <form onSubmit={handleSubmit}>

              <div>
                <label>Favorite Color</label>
                <Field
                  name="favoriteColor"
                  component={renderDropdownList}
                  data={colors}
                  valueField="value"
                  textField="color"/>
              </div>
              <div>
                <label>Hobbies</label>
                <Field
                  name="hobbies"
                  component={renderMultiselect}
                  data={[ 'Guitar', 'Cycling', 'Hiking' ]}/>
              </div>
              <div>
                <label>Sex</label>
                <Field
                  name="sex"
                  component={renderSelectList}
                  data={[ 'male', 'female' ]}/>
              </div>
              <div>
                <button type="submit" disabled={pristine || submitting}>Submit</button>
                <button type="button" disabled={pristine || submitting} onClick={reset}>Reset Values
                </button>
              </div>
            </form>
          </AbcRow>
         </AbcPanel>
      </AbcPanel>
  )
}

ReactWidgetsForm = reduxForm({
  form: 'reactWidgets'  // a unique identifier for this form
})(ReactWidgetsForm)

export default ReactWidgetsForm
