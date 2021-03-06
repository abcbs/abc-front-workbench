import React from 'react';

import CalendarView from './CalendarView';
import dates  from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import _ from './util/_';
import CustomPropTypes from './util/propTypes';
import { instanceId } from './util/widgetHelpers';

import  TimeoutMixin from './mixins/TimeoutMixin'
import  DataFilterMixin from  './mixins/DataFilterMixin'
import PopupScrollToMixin  from './mixins/PopupScrollToMixin'
import RtlParentContextMixin   from './mixins/RtlParentContextMixin'
import  AriaDescendantMixin   from './mixins/AriaDescendantMixin'
import FocusMixin   from './mixins/FocusMixin';
import PureRenderMixin from './mixins/PureRenderMixin'

let format = props => dateLocalizer.getFormat('decade', props.decadeFormat)

let optionId = (id, date) => `${id}__century_${dates.year(date)}`;

let propTypes = {
  culture: React.PropTypes.string,
  today: React.PropTypes.instanceOf(Date),
  value: React.PropTypes.instanceOf(Date),
  focused: React.PropTypes.instanceOf(Date),
  min: React.PropTypes.instanceOf(Date),
  max: React.PropTypes.instanceOf(Date),
  onChange: React.PropTypes.func.isRequired,
  decadeFormat: CustomPropTypes.dateFormat
};

export default React.createClass({

  displayName: 'CenturyView',

  mixins: [
    PureRenderMixin,
    RtlChildContextMixin,
    AriaDescendantMixin()
  ],

  propTypes,

  componentDidUpdate() {
    let activeId = optionId(instanceId(this), this.props.focused);
    this.ariaActiveDescendant(activeId)
  },

  render(){
    let { focused } = this.props;

    return (
      <CalendarView {..._.omitOwnProps(this)}>
        <tbody>
          {_.chunk(getCenturyDecades(focused), 4)
            .map(this.renderRow)
          }
        </tbody>
      </CalendarView>
    )
  },

  renderRow(row, rowIdx) {
    let {
        focused
      , disabled
      , onChange
      , value
      , today
      , culture
      , min
      , max } = this.props

    let id = instanceId(this, '_century');

    return (
      <CalendarView.Row key={rowIdx}>
        {row.map((date, colIdx) => {
          let label = dateLocalizer.format(dates.startOf(date, 'decade'), format(this.props), culture)

          return (
            <CalendarView.Cell
              key={colIdx}
              unit="decade"
              id={optionId(id, date)}
              label={label}
              date={date}
              now={today}
              min={min}
              max={max}
              onChange={onChange}
              focused={focused}
              selected={value}
              disabled={disabled}
            >
              {label}
            </CalendarView.Cell>
          )
        })}
      </CalendarView.Row>
    )
  }

});

function getCenturyDecades(_date){
  var days = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
    , date = dates.add(dates.startOf(_date, 'century'), -20, 'year')

  return days.map(() => (date = dates.add(date, 10, 'year')))
}
