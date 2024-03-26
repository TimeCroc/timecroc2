import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './AddEmployee.css';

import cleanPhoneNumber from '../../../utils/index'

//need to add better validation

interface Body {
  pin: number
  first_name: string
  last_name: string
  phone: string | null
  email: string
  hourly_rate: number
}
type AddEmployeeProps ={
  // setAddEmployee: (boolean) => void;
  isOpen: boolean;
  onClose: () => void;
  setAddEmployee: (value: boolean) => void;
}

const AddEmployee: React.FC<AddEmployeeProps> = ({ isOpen, onClose }) => {
  const [ pin, setPin ] = useState<number>(0);
  const [ first_name, setFirstName ] = useState<string>('');
  const [last_name, setLastName ] = useState<string>('');
  const [phone, setPhone ] = useState<string>('');
  const [cleanedPhone, setCleanedPhone] = useState<string | null>(''); // This is the cleaned phone number
  const [email, setEmail] = useState<string>('');
  const [hourly_rate, setHourlyRate] = useState<number>(0);
  const [validated, setValidated] = useState<boolean>(false);
  const [phoneError, setPhoneError] = useState<string>('');

  // const { setAddEmployee } = props; //cant find props
// const AddEmplyee: React.FC<AddEmployeeProps> = ({ isOpen, onClose}) => {
//     if (!isOpen) {
//       return null;
//     }
//   }

  const body: Body = {
    pin: pin,
    first_name: first_name,
    last_name: last_name,
    phone: cleanedPhone,
    email: email,
    hourly_rate: hourly_rate
  };

   // Update the cleaned phone state when the input value changes
    const handlePhoneChange = (value: string) => {
    const cleaned = cleanPhoneNumber(value);
    setPhone(value);
    setCleanedPhone(cleaned);
    console.log('cleaned:', cleaned)

    // check if cleaned === null, if so, setPhoneError to 'message'
    if (cleaned === null) {
      setPhoneError('You have entered an invalid phone number: please check your input and try again.');
    }
    // else setPhoneError to ''
    else {
      setPhoneError('');
    }
  };

   // This syntax, replacing the above, prevented an error from occurring in employeeController middleware.  
    const handleSubmit2 = (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();
      event.stopPropagation();
    
      const form = event.currentTarget;
  
      // send a window.alert() if the phone number is invalid
      if (phoneError) {
        // if phoneError is truthy, then the phone number is invalid.  Prevent form submission.
        setValidated(false);
        return;
      } else {
        fetch('/api/employees', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(body)
        })
        .then(res => res.json())
        .then(data => console.log('data:', data))
        .catch(err => {
          console.log('error:', err)
          setValidated(false)
        });
  
        setValidated(true);
      }
  }

  if(validated){
    return (
      <div>
        <h3 style={{color: 'green'}}> {first_name} added! </h3>
        <button onClick={()=> setAddEmployee(false)}><Link to='/list'>Back</Link></button>
      </div>
    )
  }

  return (
    <div className='add_employee_modal_overlay'>
      <div className='add_employee' onClick={(e) => e.stopPropagation()}>
        <Form noValidate validated={validated} onSubmit={handleSubmit2}>
          <Col classname='add_employee_col'>
            {/* <Row className="mb-3"> */}
            <div className='add_employee_inner'>
              <Form.Group as={Col} md="4" controlId="validationCustom00">
                {/* <Form.Label>Pin</Form.Label> */}
                <Form.Control
                  required
                  type="text"
                  placeholder="Pin"
                  onChange={e => setPin(Number(e.target.value))}
                  className='add_employee_form_control'
                  />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom01">
                {/* <Form.Label>First name</Form.Label> */}
                <Form.Control
                  required
                  type="text"
                  placeholder="First name"
                  onChange={e => setFirstName(e.target.value)}
                  className='add_employee_form_control'
                  />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              <Form.Group as={Col} md="4" controlId="validationCustom02">
                {/* <Form.Label>Last name</Form.Label> */}
                <Form.Control
                  required
                  type="text"
                  placeholder="Last name"
                  onChange={e => setLastName(e.target.value)}
                  className='add_employee_form_control'
                  />
                <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
              </Form.Group>
              {/* </Row> */}
              {/* <Row className="mb-3"> */}
                <Form.Group as={Col} md="6" controlId="validationCustom03">
                  {/* <Form.Label>Phone</Form.Label> */}
                  <Form.Control type="text" placeholder="Phone" required onChange={e => handlePhoneChange(e.target.value)} value={phone} isInvalid={!!phoneError} className='add_employee_form_control'/>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid phone.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom04">
                  {/* <Form.Label>Email</Form.Label> */}
                  <Form.Control type="text" placeholder="Email" required onChange={e => setEmail(e.target.value)} className='add_employee_form_control'/>
                  <Form.Control.Feedback type="invalid">
                    Please provide a valid email.
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group as={Col} md="3" controlId="validationCustom05">
                  {/* <Form.Label>Hourly Rate</Form.Label> */}
                  <Form.Control type="text" placeholder="Hourly rate"  onChange={e => setHourlyRate(Number(e.target.value))} className='add_employee_form_control'/>
                  <Form.Control.Feedback type="invalid">
                    Please provide a rate.
                  </Form.Control.Feedback>
                </Form.Group>
              {/* </Row> */}
            <Button type="submit" className='add_employee_submit_btn'>Submit</Button>
            <button className='cancel_button' onClick={()=> setAddEmployee(false)}><Link to='/list'>Cancel</Link></button>
            </div>
          </Col>
        </Form>
      </div>
    </div>
  )
}

export default AddEmployee;