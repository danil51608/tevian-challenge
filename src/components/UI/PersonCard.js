import {
  CardWrapper,
  ImgContainer,
  PersonInfo,
  EditCard,
  Button,
} from "../StyledComponents/index";
import { Alert, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import EditField from "../UI/EditField";
import SelectGender from "./SelectGender";
import axios from "axios";

const PersonCard = (props) => {
  const user = JSON.parse(useSelector((state) => state.auth.user));
  const [loader, setLoader] = useState(false)
  const [photo, setPhoto] = useState(null);
  const [edit, setEdit] = useState(false);
  const [error, setError] = useState('');
  const { Name, Midname, Surname, Age, Gender } = props.person;
  const url = "https://backend.facecloud.tevian.ru/api/v1/";


  //get person
  const getPhoto = async () => {
    setLoader(true) //turn loader on
    try {
      //get photo id 
      const res = await axios.get(`${url}persons/${props.id}/photos`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      //get photo
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
      setError('Error loading the photo!') //set error message
    }
    finally {
      setLoader(false) //turn loader off
    }
  };

  //delete person
  const handleDelete = async () => {
    setLoader(true); //turn loader on
    try {
      const res = await axios.delete(`${url}persons/${props.id}`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      props.getPersons(); //reload the page after deleting
    } catch (e) {
      setError('Error during deleting occured!') //set error message
    }
    finally {
      setLoader(false); //turn loader o
    }
  };

  //edit person request
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { Name, Midname, Surname, Age, Gender} = e.target;

    //edited object
    const data = {
      data: {
        Name: Name.value,
        Midname: Midname.value,
        Surname: Surname.value,
        Age: Age.value,
        Gender: Gender.value,
      },
    };
    setLoader(true)
    try {
      //send edited object 
      const res = await axios.post(`${url}persons/${props.id}`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
          accept: "application/json",
          "Content-Type": "application/json",
        },
      });
    } catch (e) {
      setError('Cannot get the person!') //set error
    } finally {
      setEdit(false); //enable edit mode
      setLoader(false) // turn loader off
    }
  };

  //get persons photos on loading
  useEffect(() => {
    getPhoto();
  }, []);

  return (
    <CardWrapper>
      <ImgContainer width={150}>
        {photo ? (
          <img src={`${url}photos/${photo}/image/face?width=0&height=0`} />
        ) : null}
      </ImgContainer>
        <>
          <PersonInfo onSubmit={(e) => handleSubmit(e)}>
            <EditField label="Name" data={Name} edit={edit} />
            <EditField label="Midname" data={Midname} edit={edit} />
            <EditField label="Surname" data={Surname} edit={edit} />
            <EditField label="Age" data={Age} edit={edit} type="number" />
            <SelectGender label="Gender" data={Gender} edit={edit} />
            {(edit && !loader) && <Button type="submit">Save</Button>}
            {loader && <Spinner animation="border" variant="primary" />}
          </PersonInfo>
          {!edit && (
            <EditCard>
              <span>
                <FontAwesomeIcon icon={faPen} onClick={(e) => setEdit(true)} />
              </span>
              <span>
                <FontAwesomeIcon icon={faTrashAlt} onClick={handleDelete} />
              </span>
            </EditCard>
          )}
        </>
     {error && <Alert variant="danger">{error}</Alert>}
    </CardWrapper>
  );
};

export default PersonCard;
