import axios from "axios";
import { useEffect, useReducer } from "react";
import reducer, { SET_DAY, SET_APPLICATION_DATA, SET_INTERVIEW } from "reducers/application"

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