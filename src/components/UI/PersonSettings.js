import { SettingsContainer, Button } from "../StyledComponents/index";
import { authActions } from "../../store/auth";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { Spinner, Alert } from "react-bootstrap";
import EditField from "../UI/EditField";
import SelectGender from "./SelectGender";
import axios from "axios";

const PersonSettings = (prop) => {
  const { image } = prop;
  const dispatch = useDispatch();
  const user = JSON.parse(useSelector((state) => state.auth.user));
  const personObj = useSelector((state) => state.person.person);
  const loading = useSelector((state) => state.auth.loader);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const person = personObj.demographics; //the selected person information 
  const bbox = personObj.bbox; //the selected person bbox
  const url = "https://backend.facecloud.tevian.ru/api/v1/";

  //clear messages if another person clicked
  useEffect(() => {
    setError("");
    setMessage("");
  }, [person]);

  const uploadPerson = async (e) => {
    e.preventDefault();
    setMessage(""); //clear message
    setError(""); //clear error
    dispatch(authActions.setLoader(true)); //turn loader on

    const { Name, Midname, Surname, Age, Gender } = e.target; //get fields values

    //object to send
    const data = {
      data: {
        Name: Name.value,
        Midname: Midname.value,
        Surname: Surname.value,
        Age: Age.value,
        Gender: Gender.value,
      },
      database_id: user.db,
    };
    try {
      //add person into DB request
      const res = await axios.post(`${url}persons`, data, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      uploadPhoto(res.data.data.id); //upload the person photo
      setMessage("Successfully Saved!"); //set message
    } catch (e) {
      setError("Couldn't upload the person!"); //set error
    } finally {
      dispatch(authActions.setLoader(false));
    }
  };

  
  const uploadPhoto = async (id) => {
    const position = [bbox.x, bbox.y, bbox.width, bbox.height]; //recognized face position
    try {
      const res = await axios.post(
        `${url}photos?face=${position}&person_id=${id}`,
        image,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
            "Content-Type": "image/jpeg",
          },
        }
      );
    } catch (e) {
      setError("Couldn't upload the person's photo!");
    }
  };

  return (
    <SettingsContainer onSubmit={(e) => uploadPerson(e)}>
      <EditField label="Name" data={person.name} edit={true} />
      <EditField label="Midname" data={person.midname} edit={true} />
      <EditField label="Surname" data={person.surname} edit={true} />
      <EditField label="Age" data={person.age.mean} edit={true} type="number" />
      <SelectGender label="Gender" data={person.gender} edit={true} />
      {!loading && <Button type="submit">Save</Button>}
      {loading && <Spinner animation="border" variant="primary" />}
      {message && <Alert variant="success">{message}</Alert>}
      {error && <Alert variant="danger">{error}</Alert>}
    </SettingsContainer>
  );
};

export default PersonSettings;
