import axios from "axios";
import { authActions } from "../store/auth";

//проверить форму на ошибки
export function checkValidity(dispatch, email, password) {
  let valid = true;
  if (!email.trim() || !email.includes("@")) {
    dispatch(authActions.setEmailError("Enter a valid Email!"));
    valid = false;
  }
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

//сделать запрос на регистрацию/логин
export async function makeRequest(dispatch, email, password, type, history) {
  //url регистрации или логина
  const url = `https://backend.facecloud.tevian.ru/api/v1/${
    type === "LOGIN" ? "login" : "users"
  }`;

  const requestBody = {
    email,
    password,
  };

  //добавить billing_type, если запрос регистрации
  if (type === "REGISTER") {
    requestBody["billing_type"] = "demo";
  }

  try {
    const res = await axios.post(url, requestBody);
    if (res.data.data.access_token) {
      const user = JSON.stringify({ email, token: res.data.data.access_token });
      localStorage.setItem("user", user);
      dispatch(authActions.setUser(user));
      history.push('/') //перенаправление на домашнюю страницу при успешном входе
    }
    if(type === "REGISTER"){
        history.push('/login') //перенаправление на страницу входа при успешной регистрации
    }
  } catch (e) {
    if (e.response.data.error.email) {
      dispatch(authActions.setEmailError(e.response.data.error.email[0]));
    } else if (e.response.data.error.password) {
      dispatch(authActions.setPasswordError(e.response.data.error.password[0]));
    } else if (e.response.data.message) {
      dispatch(authActions.setPassError(e.response.data.message));
    }
  } finally {
    dispatch(authActions.setLoader(false)); //скрыть loader
  }
}

//отправка формы
export function handleSubmit(e, dispatch, email, password, type, history) {
  e.preventDefault();
  dispatch(authActions.setEmailError("")); //скрыть ошибки
  dispatch(authActions.setPassError(""));
  const valid = checkValidity(dispatch, email, password, type); //проверка правильности заполнения формы
  if (!valid) return;
  dispatch(authActions.setLoader(true)); //показать loader
  makeRequest(dispatch, email, password, type, history);
}

export function handleLogout(dispatch, history) {
  localStorage.removeItem("user");
  dispatch(authActions.logoutUser());
  history.push('/login')
}
