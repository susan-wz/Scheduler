import React from "react";
import "components/DayListItem.scss";
import classNames from 'classnames/bind';

export default function DayListItem(props) {
  const dayClass = classNames("day-list__item", {
    "day-list__item--selected": props.selected,
    "day-list__item--full": props.spots===0
  })

  const formatSpots = function(daysRemaining) {
    if (daysRemaining === 0) {
      return "no spots remaining"
    } else if (daysRemaining === 1) {
      return daysRemaining += " spot remaining"
    } else {
      return daysRemaining += " spots remaining"
    }
  }

  return (
    <li 
    className={dayClass}
    onClick={() => props.setDay(props.name)}
    data-testid="day" 
    >
      <h2 className="text--regular">{props.name}</h2> 
      <h3 className="text--light">{formatSpots(props.spots)}</h3>
    </li>
  );
}