import React, { useState, useEffect } from "react";
import "components/Application.scss";
import DayList from "components/DayList";
import Appointment from "components/Appointment";
import axios from "axios";
import getAppointmentsForDay from "helpers/selectors"
import {getInterview} from "helpers/selectors"
import {getInterviewersForDay} from "helpers/selectors"

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {}, 
    interviewers: ""
  })
  const setDay = day => setState({ ...state, day });

  function bookInterview(id, interview) {
    console.log(id, interview);
  }

  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get("/api/days")),
      Promise.resolve(axios.get("/api/appointments")), 
      Promise.resolve(axios.get("/api/interviewers"))
    ]).then((response) => {
        setState(prev => ({ ...prev, days: response[0].data, appointments: response[1].data, interviewers: response[2].data}))
      })
      .catch((error) => console.log(error))
  }, [])

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
          bookInterview={bookInterview}/>
        })}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
