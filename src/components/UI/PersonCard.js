import {
  CardWrapper,
  ImgContainer,
  PersonInfo,
} from "../StyledComponents/index";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

const PersonCard = (props) => {
  const user = JSON.parse(useSelector((state) => state.auth.user));
  const [full, setFull] = useState(true);
  const [photo, setPhotos] = useState(null);
  const { name, midName, surname } = props.person;
  const url = "https://backend.facecloud.tevian.ru/api/v1/";

  const getPhoto = async () => {
    try {
      const res = await axios.get(`${url}persons/${props.id}/photos`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        }
      });
      console.log(res)
      
      const photo = await axios.get(`${url}photos/${res.data.data[0].id}/image/face?width=0&height=0`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          accept: 'image/jpeg'
        }
      });

      setPhotos(res.data.data[0].id)
      
    } catch (e) {
      console.log(e);
    }
  };

  

  useEffect(() => {
    getPhoto();
  }, []);


  return (
    <CardWrapper>
      <ImgContainer width={300}>
        {photo ? <img src={`${url}photos/${photo}/image/face?width=0&height=0`}/> : null}
      </ImgContainer>
      {full && (
        <PersonInfo>
          <label htmlFor="name">Name:</label>
          <span id="name">{name}</span>
          <label htmlFor="midname">MidName:</label>
          <span id="midname">{midName}</span>
          <label htmlFor="surname">Surname:</label>
          <span id="surname">{surname}</span>
        </PersonInfo>
      )}
      <button onClick={(e) => setFull(!full)}>
        Show {full ? "less" : "more"}
      </button>
    </CardWrapper>
  );
};

export default PersonCard;
