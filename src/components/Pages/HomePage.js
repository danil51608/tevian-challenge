import { useEffect, useState } from "react";
import { authActions } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { Button, Instuctions, PageContainer } from "../StyledComponents/index";
import { Spinner, Alert } from "react-bootstrap";
import PersonSettings from "../UI/PersonSettings";
import Upload from "../UI/Upload";
import ExploredImage from "../UI/ExploredImage";
import axios from "axios";

const HomePage = () => {
  const user = JSON.parse(useSelector((state) => state.auth.user)); //get user from redux
  const loading = useSelector((state) => state.auth.loader)
  const person = useSelector((state) => state.person.person);
  const history = useHistory();
  const [image, setImage] = useState(null);
  const [proportion, setProportion] = useState(null);
  const [faces, setFaces] = useState(null);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const url = "https://backend.facecloud.tevian.ru/api/v1/";


  //image upload
  const handleUpload = (src) => {
    setImage(src); //save img to state

    //process of getting img width
    const img = new Image();
    img.src = URL.createObjectURL(src);
    img.onload = () => {
      const width = img.naturalWidth;
      setProportion(width / 500); //seting proportion. width - original img width. 500 - img width inside container.
      //proportion is needed to convert bbox coords and size
    };
  };

  //face recognition request  
  const handleDetect = async () => {
    dispatch(authActions.setLoader(true)); //turn loader on
    try {
      const res = await axios.post(`${url}detect?demographics=true`, image, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          "Content-Type": "image/jpeg",
        },
      });
      setFaces(res.data.data);
    } catch (e) {
      setError('Couldn\'t recognize any face!') //set error
    }
    finally {
      dispatch(authActions.setLoader(false)); //turn loader off
    }
  };

  //get user's DB
  const getDatabase = async () => {
    try {
      const res = await axios.get(`${url}databases?page=0&per_page=5`, {
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      });

      // save user's DB if exist, create if not
      if (res.data.data[0]) {
        user.db = res.data.data[0].id;
        dispatch(authActions.setUser(JSON.stringify(user))); //add DB id to user model inside Redux
      } else {
        createDatabase(); //create DB
      }
    } catch (e) {
      setError("Getting database error"); //set error
    }
  };

  // create DB request
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
      dispatch(authActions.setUser(JSON.stringify(user))); //add DB id to user model inside Redux
    } catch (e) {
      setError("Getting database error!"); //set error
    }
  };

  //get DB if authorized, redirect to login page if not
  useEffect(() => {
    if (user) {
      getDatabase();
    } else {
      history.push("/login"); //redirect to login page
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
      {!loading && <Upload onChange={(e) => handleUpload(e.target.files[0])} image={image} />}
      {(image && person) && <PersonSettings image={image} />}
      {error && <Alert variant="danger">{error}</Alert>}
    </PageContainer>
  );
};

export default HomePage;
