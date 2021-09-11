import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { authActions } from "../../store/auth";
import { StyledImage, StyledUpload, BoundingBox } from "../StyledComponents/index";
import axios from "axios";

const HomePage = () => {
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [proportion, setProportion] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(useSelector((state) => state.auth.user));
  const url = "https://backend.facecloud.tevian.ru/api/v1/";
  const [faces, setFaces] = useState(null);

  
  const handleUpload = (src) => {
    setImage(src);
    const img = new Image();
    img.src = URL.createObjectURL(src);
    img.onload = () => {
      const width = img.naturalWidth;
      setProportion(width/500)
    }
  }

  const handleDetect = async () => {
    try {
      const res = await axios.post(`${url}detect?demographics=true`, image, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "image/jpeg",
        },
      });
      console.log(res);
      setFaces(res.data.data)
    } catch (e) {
      console.log(e);
    }
  };

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
        user.db = res.data.data[0].id;
        dispatch(authActions.setUser(JSON.stringify(user)));
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
      const res = await axios.post(
        `${url}databases`,
        {},
        {
          headers: {
            Authorization: "Bearer " + user.token,
            accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      );
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
  console.log(faces)
  return (
    <section>
      <StyledImage src={image ? URL.createObjectURL(image) : null} faces={faces} proportion={proportion} />
      <StyledUpload onChange={(e) => handleUpload(e.target.files[0])} />
      <button onClick={handleDetect}>Detect Faces!</button>
    </section>
  );
};

export default HomePage;
