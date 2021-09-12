import axios from "axios";
import { authActions } from "../store/auth";

//check form for errors
export function checkValidity(dispatch, email, password) {
  let valid = true;
  //validate email
  if (!email.trim() || !email.includes("@")) {
    dispatch(authActions.setEmailError("Enter a valid Email!"));
    valid = false;
  }
  //validate password
  if (!password.trim()) {
    dispatch(authActions.setPassError("Enter a password!"));
    valid = false;
  }
  if (password.trim().length < 8) {
    dispatch(
      authActions.setPassError("Password must be at least 8 characters!")
    );
    valid = false;
  }
  return valid;
}

//login/register request
export async function makeRequest(dispatch, email, password, type, history) {
  //login/register url
  const url = `https://backend.facecloud.tevian.ru/api/v1/${
    type === "LOGIN" ? "login" : "users"
  }`;

  const requestBody = {
    email,
    password,
  };

  //add billing_type, if current request is registration
  if (type === "REGISTER") {
    requestBody["billing_type"] = "demo";
  }

  try {
    const res = await axios.post(url, requestBody);
    if (res.data.data.access_token) {
      const user = JSON.stringify({ email, token: res.data.data.access_token }); // create user 
      localStorage.setItem("user", user); //save user into localStorage
      dispatch(authActions.setUser(user)); //save user into redux
      history.push("/"); //redirect to home page
    }
    if (type === "REGISTER") {
      history.push("/login"); //redirect to login page if registration is successful
    }
  } catch (e) {
    //set error
    if (e.response.data.error) {
      dispatch(authActions.setEmailError(e.response.data.error.email[0]));
    } else if (e.response.data.message) {
      dispatch(authActions.setPassError(e.response.data.message));
    }
  } finally {
    dispatch(authActions.setLoader(false)); //turn loader off
  }
}

//send form
export function handleSubmit(e, dispatch, email, password, type, history) {
  e.preventDefault();
  dispatch(authActions.setEmailError("")); //hide email errors
  dispatch(authActions.setPassError("")); //hide password errors
  const valid = checkValidity(dispatch, email, password, type); 
  if (!valid) return;
  dispatch(authActions.setLoader(true)); //turn loader on
  makeRequest(dispatch, email, password, type, history);
}

export function handleLogout(dispatch, history) {
  localStorage.removeItem("user"); //delete user
  dispatch(authActions.logoutUser());
  history.push("/login"); //redirect to login page
}
