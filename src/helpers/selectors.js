export default function getAppointmentsForDay(state, day) {
  const appointmentArray = []
  const matchedDay = state.days.filter(element => element.name === day)
  if (matchedDay.length > 0 && matchedDay[0].appointments.length > 0) {
  matchedDay[0].appointments.forEach(appointment => 
    appointmentArray.push(state.appointments[appointment]))
  }
  return appointmentArray;
}

export const getInterview = function (state, interview) {
  let result = null;
  if (interview) {
  result = {...interview, interviewer: state.interviewers[interview.interviewer]};
  }
  return result;
}
