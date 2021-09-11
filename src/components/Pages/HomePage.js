import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {authActions} from "../../store/auth";
import axios from "axios";

const HomePage = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const user = JSON.parse(useSelector((state) => state.auth.user));
  const url = "https://backend.facecloud.tevian.ru/api/v1/";

  const getDatabase = async () => {
    try {
      const res = await axios.get(`${url}databases?page=0&per_page=5`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      }); //ДОБАВИТЬ ПАГИНАЦИЮ!!!
      
      // если у пользователя есть БД, сохранить её id
      if (res.data.data[0]) {
          user.db = res.data.data[0].id
          dispatch(authActions.setUser(JSON.stringify(user)))
        console.log(res.data.data[0].id);
      } else {
        createDatabase();
        console.log("No database found");
      }
    } catch (e) {
      console.log("Error getting database");
    }
  };


  const createDatabase = async () => {
    try {
      const res = await axios.post(`${url}databases`, {}, {
          headers: {
            'Authorization': "Bearer " + user.token,
            'accept': "application/json",
            'Content-Type': 'application/json'
          }
      });
      console.log(res.data.data.id);
    } catch (e) {
      console.log("Error creating database!");
    }
  };

  useEffect(() => {
    if (user) {
      getDatabase();
    } else {
      history.push("/login"); //перенаправить на страницу входа, если вход не был выполнен
    }
  }, []);

  return <div>Homepage</div>;
};

export default HomePage;
