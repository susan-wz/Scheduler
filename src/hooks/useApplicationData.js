import axios from "axios";
import { useEffect, useReducer } from "react";

const SET_DAY = "SET_DAY";
const SET_APPLICATION_DATA = "SET_APPLICATION_DATA";
const SET_INTERVIEW = "SET_INTERVIEW";

function reducer(state, action) {
  switch (action.type) {
    case SET_DAY:
      return { ...state, day: action.day }
    case SET_APPLICATION_DATA:
      return { ...state, days: action.days, appointments: action.appointments, interviewers: action.interviewers }
    case SET_INTERVIEW:
      const { id, interview } = action;
      return {
        ...state,
        appointments: {
          ...state.appointments,
          [id]: {
            ...state.appointments[action.id],
            interview: action.interview ? { ...interview } : null
          }
        }
      }
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
        const dayObject = state.days.find(day => day.name === state.day);
        state.days[dayObject.id - 1].spots--;
        dispatch({ type: SET_INTERVIEW, id, interview })
      })
  }

  function editInterview(id, interview) {
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
        const dayObject = state.days.find(day => day.name === state.day);
        state.days[dayObject.id - 1].spots++;
        dispatch({ type: SET_INTERVIEW, id, interview: null })
      })
  }

  return { state, setDay, bookInterview, cancelInterview, editInterview }
}