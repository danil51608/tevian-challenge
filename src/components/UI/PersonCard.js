import {
  CardWrapper,
  ImgContainer,
  PersonInfo,
  ShowMore,
  EditCard,
  Button
} from "../StyledComponents/index";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditField from '../UI/EditField'
import axios from "axios";

const PersonCard = (props) => {
  const user = JSON.parse(useSelector((state) => state.auth.user));
  const [full, setFull] = useState(false);
  const [photo, setPhoto] = useState(null);
  const [edit, setEdit] = useState(false)
  const { name, midName, surname, age, gender } = props.person;
  const url = "https://backend.facecloud.tevian.ru/api/v1/";

  const getPhoto = async () => {
    try {
      const res = await axios.get(`${url}persons/${props.id}/photos`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });
      console.log(res);

      const photo = await axios.get(
        `${url}photos/${res.data.data[0].id}/image/face?width=0&height=0`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            accept: "image/jpeg",
          },
        }
      );

      setPhoto(res.data.data[0].id);
    } catch (e) {
      console.log(e);
    }
  };


  const handleDelete = async () => {
    try{
        const res = await axios.delete(`${url}persons/${props.id}`, {headers: {Authorization: `Bearer ${user.token}`}})
        props.getPersons()
    }
    catch (e) {
        console.log(e)
    }
  }

  const handleSubmit = async (e) => {
      e.preventDefault()
      const {Name, Midname, Surname } = e.target
      const data = {
        data: {name: Name.value,
         midName: Midname.value,
         surname: Surname.value}
      }
      try{
        const res = await axios.post(`${url}persons/${props.id}`, data, {headers: {
            Authorization: `Bearer ${user.token}`,
            accept: 'application/json',
            'Content-Type': 'application/json'
        }})
        console.log(res)
      }
      catch(e){
        console.log(e)
      }
      finally{
          setEdit(false)
      }
  }

  useEffect(() => {
    getPhoto();
  }, []);



  return (
    <CardWrapper>
      <ImgContainer width={300}>
        {photo ? (
          <img src={`${url}photos/${photo}/image/face?width=0&height=0`} />
        ) : null}
      </ImgContainer>
      {full && (
        <>
          <PersonInfo onSubmit={e=>handleSubmit(e)}>
            <EditField label='Name' data={name} edit={edit}/>
            <EditField label='Midname' data={midName} edit={edit}/>
            <EditField label='Surname' data={surname} edit={edit}/>
            <EditField label='Age' data={age} edit={edit} type='number'/>
            <span>{gender}</span>
            {edit && <Button type='submit'>Save</Button>}
          </PersonInfo>
          {!edit && <EditCard>
            <span>
              <FontAwesomeIcon icon={faPen} onClick={e=>setEdit(true)} />
            </span>
            <span>
              <FontAwesomeIcon icon={faTrashAlt} onClick={handleDelete}/>
            </span>
          </EditCard>}
          
        </>
      )}
      <ShowMore onClick={(e) => setFull(!full)}>
        Show {full ? "less" : "more"}
      </ShowMore>
    </CardWrapper>
  );
};

export default PersonCard;
