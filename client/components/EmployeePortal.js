import React, { useState } from 'react';
import ClockInPortal from './ClockInPortal';
import ClockOutPortal from './ClockOutPortal';
import { useNavigate } from 'react-router-dom';

const EmployeePortal = (props) => {
  const navigate = useNavigate();
  const { pin, first_name } = props.currentEmployee;

<<<<<<< HEAD
  const {
    setCurrentEmployee,
    currentShift,
    setTimesheet,
    setValidationMessage,
    endTime,
    setEndTime,
    startTime,
    setStartTime,
    getStart,
    getEnd,
    setExtrasView,
    extrasView,
    setTips,
    tips,
    tours,
    setTours,
    reimbursements,
    setReimbursements,
    DOC,
    setDOC,
  } = props;
=======
  const { setCurrentEmployee, currentShift, setTimesheet, setValidationMessage, endTime, setEndTime, startTime, setStartTime, getStart, getEnd, setExtrasView, extrasView, setTips, tips, tours, setTours, reimbursements, setReimbursements, DOC, setDOC } = props;
>>>>>>> 3087f626526185e6353c3ab8c6e08b7834d6f316
  const body = {
    shift_id: currentShift._id,
  };

  const extrasBody = {
    shift_id: currentShift._id,
    tips: tips,
    reimbursements: reimbursements,
    tours: tours,
    doc: DOC,
  };

  function handleClockIn() {
    setTips(0);
    setTours(0);
    setReimbursements(0);
    setDOC(0);

    fetch(`/api/shifts/${pin}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        getStart(data.start_time);
        setValidationMessage(`You clocked in at: `);
        setEndTime(data.end_time);
        navigate('/employeeportal/validation');
      })
      .catch((err) => console.log('error:', err));
  }

  function handleClockOut() {
    handleAddExtras();
    fetch(`/api/shifts/${pin}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((data) => {
        getEnd(data.end_time);
        setValidationMessage(`You clocked out at:  `);
        navigate('/employeeportal/validation');
      })
      .catch((err) => console.log('error:', err));
  }

  function handleAddExtras() {
    fetch(`/api/shifts/extras/${pin}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(extrasBody),
    })
      .then((res) => res.json())
      .then((data) => {
        //console.log('extras body data', data);
      })
      .catch((err) => console.log('error:', err));
    setTips(0);
    setTours(0);
    setReimbursements(0);
    setDOC(0);
  }

  function viewTimesheet() {
    fetch(`api/shifts/timesheet/${pin}`)
      .then((res) => res.json())
      .then((data) => {
        setTimesheet(data);
        navigate('/employeeportal/timesheet');
      })
      .catch((err) => console.log('error:', err));
  }

  if (endTime === null) {
    return (
<<<<<<< HEAD
      <div className='clock_out_portal'>
        <ClockOutPortal
          first_name={first_name}
          handleClockOut={handleClockOut}
          viewTimesheet={viewTimesheet}
          startTime={startTime}
          setExtrasView={setExtrasView}
          tips={tips}
          setTips={setTips}
          setCurrentEmployee={setCurrentEmployee}
        />
=======

      <div className="clock_out_portal">
        <ClockOutPortal first_name={first_name} handleClockOut={handleClockOut} viewTimesheet={viewTimesheet} startTime={startTime} setExtrasView={setExtrasView} tips={tips} setTips={setTips} setCurrentEmployee={setCurrentEmployee}/>

>>>>>>> 3087f626526185e6353c3ab8c6e08b7834d6f316
      </div>
    );
  }
  return (
    <div>
<<<<<<< HEAD
      <div className='clock_in_portal'>
        <ClockInPortal
          first_name={first_name}
          handleClockIn={handleClockIn}
          viewTimesheet={viewTimesheet}
          setCurrentEmployee={setCurrentEmployee}
        />{' '}
=======

      <div className="clock_in_portal">
        <ClockInPortal first_name={first_name} handleClockIn={handleClockIn} viewTimesheet={viewTimesheet} setCurrentEmployee={setCurrentEmployee}/>

>>>>>>> 3087f626526185e6353c3ab8c6e08b7834d6f316
      </div>
    </div>
  );
};

export default EmployeePortal;
