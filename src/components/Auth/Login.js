import { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { FormWrapper } from "../StyledComponents";
import { handleSubmit } from "../../functions/auth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const emailError = useSelector((state) => state.auth.emailError);
  const passError = useSelector((state) => state.auth.passError);
  const loader = useSelector((state) => state.auth.loader);
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <FormWrapper>
      <Form
        onSubmit={(e) =>
          handleSubmit(e, dispatch, email, password, "LOGIN", history)
        }
      >
        <h1>Log In</h1>
        <Form.Group controlId="formBasicEmail">
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

        {passError && <Alert variant="danger">{passError}</Alert>}

        {!loader && (
          <Button variant="primary" type="submit">
            Submit
          </Button>
        )}
        {loader && <Spinner animation="border" variant="primary" />}
      </Form>
      <br />
      <span>
        Don't have an account? <Link to="/register">Sign Up</Link>
      </span>
    </FormWrapper>
  );
};

export default Login;
