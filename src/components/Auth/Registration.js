import { useState } from "react";
import {Link, useHistory} from 'react-router-dom'
import { FormWrapper } from '../StyledComponents';
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import {handleSubmit} from '../../functions/auth'


const Registration = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailError = useSelector((state) => state.auth.emailError);
  const passError = useSelector((state) => state.auth.passError);
  const loader = useSelector((state) => state.auth.loader);
  const dispatch = useDispatch();
  const history = useHistory()

  // // check form validity
  // const checkValidity = () => { 
  //   let valid = true
  //   if (password.trim() !== confirm.trim()) {
  //     setPassError("Passwords are not the same!");
  //     valid = false;
  //   }
  //   if (!email.trim() || !email.includes('@')) {
  //     setEmailError("Invalid Email!");
  //     valid = false;
  //   }
  //   if (password.trim().length < 8) {
  //     setPassError("Password must be at least 8 characters!");
  //     valid = false;
  //   }
  //   return valid;
  // }

  // const makeRequest = async () => {
  //   try{
  //     const res = await axios.post(`${url}users`, {
  //       "billing_type": "demo",
  //       email,
  //       password
  //     })
  //   } catch(e){
      
  //   }
  //   finally{
  //     setLoader(false)
  //   }
  // }

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   setEmailError('');
  //   setPassError('');
  //   const valid = checkValidity()
  //   if(!valid) return;
  //   setLoader(true)
  //   makeRequest()
  // };

  return (
    <FormWrapper>
      <Form onSubmit={(e) => handleSubmit(e, dispatch, email, password, 'REGISTER', history)}>
        <Form.Group controlId="formBasicEmail">
        <h1>Sign Up</h1>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={email}
            name="email"
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        {emailError && <Alert variant="danger">{emailError}</Alert>}
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            value={password}
            name="password"
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
  
        {passError && <Alert variant='danger'>{passError}</Alert>}
  
        {!loader && <Button variant="primary" type="submit">
          Sign up
        </Button>}
        {loader &&  <Spinner animation="border" variant="primary" />}
        
      </Form>
      <br/>
        <span>Already have an account? <Link to="/login">Log in</Link></span>
    </FormWrapper>
  );
};

export default Registration;
