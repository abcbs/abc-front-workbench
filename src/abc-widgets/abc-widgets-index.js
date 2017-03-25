let configure = require('./configure');

if (process.env.NODE_ENV !== 'production' ) {
  [
    Array.prototype.some,
    Array.prototype.filter,
    Array.prototype.reduce
  ].forEach(method => {
    if (!method) throw new Error(
      'One or more ES5 features is not available to ReactWidgets: ' +
      'http://jquense.github.io/react-widgets/docs/#/getting-started/browser' )
  })
}

export  {configure}
export {default as DropdownList} from './DropdownList'
export {default as Combobox} from './Combobox'
export {default as Calendar} from './Calendar'
export {default as DateTimePicker} from './DateTimePicker'
export {default as NumberPicker} from './NumberPicker'
export {default as Multiselect} from './Multiselect'
export {default as SelectList} from './SelectList'

import {default as ReplaceTransitionGroup} from './ReplaceTransitionGroup'
import {default as SlideTransition} from './SlideTransition'


export const utils= {
  ReplaceTransitionGroup:ReplaceTransitionGroup,
  SlideTransition: SlideTransition
}

// module.exports = {
//   ...configure,
//   DropdownList:     require('./DropdownList'),
//   Combobox:         require('./Combobox'),
//   Calendar:         require('./Calendar'),
//   DateTimePicker:   require('./DateTimePicker'),
//   NumberPicker:     require('./NumberPicker'),
//   Multiselect:      require('./Multiselect'),
//   SelectList:       require('./SelectList'),
//
//   utils: {
//     ReplaceTransitionGroup: require('./ReplaceTransitionGroup'),
//     SlideTransition:        require('./SlideTransition')
//   }
// }
