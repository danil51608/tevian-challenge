import { useEffect, useState } from "react";
import { authActions } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Instuctions, PageContainer } from "../StyledComponents/index";
import { Spinner } from "react-bootstrap";
import PersonSettings from "../UI/PersonSettings";
import Upload from "../UI/Upload";
import ExploredImage from "../UI/ExploredImage";
import axios from "axios";

const HomePage = () => {
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [proportion, setProportion] = useState(null);
  const dispatch = useDispatch();
  const user = JSON.parse(useSelector((state) => state.auth.user));
  const loading = useSelector((state) => state.auth.loader)
  const person = useSelector((state) => state.person.person);
  const url = "https://backend.facecloud.tevian.ru/api/v1/";
  const [faces, setFaces] = useState(null);

  const handleUpload = (src) => {
    setImage(src);
    const img = new Image();
    img.src = URL.createObjectURL(src);
    img.onload = () => {
      const width = img.naturalWidth;
      setProportion(width / 500);
    };
  };

  const handleDetect = async () => {
    dispatch(authActions.setLoader(true));
    try {
      const res = await axios.post(`${url}detect?demographics=true`, image, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "image/jpeg",
        },
      });
      setFaces(res.data.data);
      console.log(res.data.data);
    } catch (e) {
      console.log(e);
    }
    finally {
      dispatch(authActions.setLoader(false));
    }
  };

  const getDatabase = async () => {
    try {
      const res = await axios.get(`${url}databases?page=0&per_page=5`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      // если у пользователя есть БД, сохранить её id
      if (res.data.data[0]) {
        user.db = res.data.data[0].id;
        dispatch(authActions.setUser(JSON.stringify(user)));
        console.log(user);
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
      user.db = res.data.data.id;
      dispatch(authActions.setUser(JSON.stringify(user)));
      console.log(user);
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
  return (
    <PageContainer>
      {faces && (
        <Instuctions>Click a face to see the person's parameters.</Instuctions>
      )}
      <ExploredImage
        src={image ? URL.createObjectURL(image) : null}
        faces={faces}
        proportion={proportion}
      />
      {(image && !loading) && <Button onClick={handleDetect}>Detect Faces!</Button>}
      {loading && <Spinner animation="border" variant="primary" />}
      <Upload onChange={(e) => handleUpload(e.target.files[0])} image={image} />
      {(image && person) && <PersonSettings image={image} />}
    </PageContainer>
  );
};

export default HomePage;
