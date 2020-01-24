import axios from "axios";
import { useEffect, useReducer } from "react";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";
const SET_SOCKET = "SET_SOCKET"

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
    case SET_INTERVIEW:
      const { id, interview } = action;
      const appointments = {
        ...state.appointments,
        [id]: {
          ...state.appointments[action.id],
          interview: action.interview ? { ...interview } : null
        }
      };
      const days = JSON.parse(JSON.stringify(state.days));
      const dayIndex = state.days.findIndex(day => day.name === state.day);
      const day = days[dayIndex];
      days[dayIndex].spots = day.appointments.length - day.appointments.filter(appt => appointments[appt].interview).length;
      return {
        ...state,
        days,
        appointments 
      };
    case SET_SOCKET:
      return { ...state, socket: action }
    default: throw new Error(`Tried to reduce with unsupported action type: ${action.type}`)
  }
}

export default function useApplicationData() {
  const [state, dispatch] = useReducer(reducer, {
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8001")
    socket.addEventListener('open', function () {
      dispatch({ type: SET_SOCKET, value: socket })
    })
    socket.onopen = function (event) {
      socket.send("ping");
    }
    socket.addEventListener('message', function(message) {
      const event = JSON.parse(message.data)
      if (event.type === "SET_INTERVIEW") {
      dispatch({ ...event })
      }
    })
    return () => { socket.close(); }
  }, []);

  useEffect(() => {
    Promise.all([axios.get("/api/days"), axios.get("/api/appointments"), axios.get("/api/interviewers")])
      .then((all) => {
        dispatch({
          type: SET_APPLICATION_DATA,
          days: all[0].data,
          appointments: all[1].data,
          interviewers: all[2].data
        })
      })
      .catch((error) => console.log(error))
  }, [])

  const setDay = day => dispatch({ type: SET_DAY, day })

  function bookInterview(id, interview) {
    const appointment = {
      ...state.appointments[id],
      interview
    };
    return axios.put(`/api/appointments/${id}`, appointment)
      .then(() => {
        dispatch({ type: SET_INTERVIEW, id, interview })
      })
  }

  function cancelInterview(id) {
    return axios.delete(`api/appointments/${id}`)
      .then(() => {
        
        dispatch({ type: SET_INTERVIEW, id, interview: null })
      })
  }

  return { state, setDay, bookInterview, cancelInterview }
}