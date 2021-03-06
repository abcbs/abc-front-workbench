import React from 'react';

import CalendarView from './CalendarView'
import dates from './util/dates';
import { date as dateLocalizer } from './util/localizers';
import _  from './util/_';
import CustomPropTypes from './util/propTypes';
import { instanceId } from './util/widgetHelpers';

import TimeoutMixin from './mixins/TimeoutMixin';
import AutoFocusMixin  from './mixins/AutoFocusMixin';
import PureRenderMixin  from './mixins/PureRenderMixin';
import DataFilterMixin from './mixins/DataFilterMixin';
import PopupScrollToMixin from './mixins/PopupScrollToMixin';
import RtlParentContextMixin  from './mixins/RtlParentContextMixin';
import AriaDescendantMixin  from './mixins/AriaDescendantMixin';
import FocusMixin  from './mixins/FocusMixin';
import RtlChildContextMixin from './mixins/RtlChildContextMixin'

var format = props => dateLocalizer.getFormat('month', props.monthFormat)

let propTypes = {
  culture:      React.PropTypes.string,
  today:        React.PropTypes.instanceOf(Date),
  value:        React.PropTypes.instanceOf(Date),
  focused:      React.PropTypes.instanceOf(Date),
  min:          React.PropTypes.instanceOf(Date),
  max:          React.PropTypes.instanceOf(Date),
  onChange:     React.PropTypes.func.isRequired,

  monthFormat:  CustomPropTypes.dateFormat
};

let optionId = (id, date) => `${id}__year_${dates.year(date)}-${dates.month(date)}`;

let YearView = React.createClass({

  displayName: 'YearView',

  mixins: [
    RtlChildContextMixin,
    AriaDescendantMixin()
  ],

  propTypes,

  componentDidUpdate() {
    let activeId = optionId(instanceId(this), this.props.focused);
    this.ariaActiveDescendant(activeId)
  },

  render(){
    let { focused } = this.props
      , months = dates.monthsInYear(dates.year(focused))

    return (
      <CalendarView {..._.omitOwnProps(this)}>
        <tbody>
          {_.chunk(months, 4).map(this.renderRow)}
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

    let id = instanceId(this)
      , labelFormat = dateLocalizer.getFormat('header');

    return (
      <CalendarView.Row key={rowIdx}>
        {row.map((date, colIdx) => {
          var label = dateLocalizer.format(date, labelFormat, culture);

          return (
            <CalendarView.Cell
              key={colIdx}
              id={optionId(id, date)}
              label={label}
              date={date}
              now={today}
              min={min}
              max={max}
              unit="month"
              onChange={onChange}
              focused={focused}
              selected={value}
              disabled={disabled}
            >
              {dateLocalizer.format(date, format(this.props), culture)}
            </CalendarView.Cell>
          )
        })}
    </CalendarView.Row>
    )
  }
});

export default YearView;
