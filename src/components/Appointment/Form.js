import React, { useState } from "react";
import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

export default function Form(props) {

  const [name, setName] = useState(props.name || "");
  const [error, setError] = useState("")
  const [interviewer, setInterviewer] = useState(props.interviewer || null);

  const reset = function() {
    setName("")
    setInterviewer(null)
  }

  const cancel = function() {
    reset();
    props.onCancel();
  }

  const validate = function() {
    if(name === "") {
      setError("Student name cannot be blank");
      return
    }
    if (!interviewer) {
      setError("Must choose an interviewer");
      return
    }
    setError("")
    console.log("This is interviewer", interviewer)
    props.onSave(name, interviewer);
  }

  return (
    <main className="appointment__card appointment__card--create">
      <section className="appointment__card-left">
        <form autoComplete="off" onSubmit={event => event.preventDefault()}>
          <input
            className="appointment__create-input text--semi-bold"
            type="text"
            placeholder="Enter Student Name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
          />
        </form>
        <section className="appointment__validation">{error}</section>
        <InterviewerList interviewers={props.interviewers} value={interviewer} onChange={(value) => setInterviewer(value)} />
      </section>
      <section className="appointment__card-right">
        <section className="appointment__actions">
          <Button danger onClick={cancel}>Cancel</Button>
          <Button confirm onClick={validate}>Save</Button>
        </section>
      </section>
    </main>
  );
}
