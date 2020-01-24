import React from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import getAppointmentsForDay from "helpers/selectors"
import {getInterview} from "helpers/selectors"
import {getInterviewersForDay} from "helpers/selectors"
import useApplicationData from "hooks/useApplicationData";

export default function Application(props) {

  const {
    state,
    setDay,
    bookInterview,
    cancelInterview, 
    editInterview
  } = useApplicationData();

  console.log("this is state in Application", state)

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={state.days}
            day={state.day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {getAppointmentsForDay(state, state.day).map(appointment => {
          return <Appointment 
          key={appointment.id} 
          interview={getInterview(state, appointment.interview)} 
          id={appointment.id} time={appointment.time} 
          interviewers={getInterviewersForDay(state, state.day)}
          bookInterview={bookInterview}
          editInterview={editInterview}
          cancelInterview={cancelInterview}/>
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
