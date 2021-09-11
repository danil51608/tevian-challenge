import { SettingsContainer, Button } from "../StyledComponents/index";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import axios from "axios";

const PersonForm = (prop) => {
  const { image } = prop;
  const person = prop.person.demographics;
  const bbox = prop.person.bbox;
  const user = JSON.parse(useSelector((state) => state.auth.user));
  const [age, setAge] = useState(person.age.mean);
  const [name, setName] = useState("");
  const [midName, setMidName] = useState("");
  const [surname, setSurname] = useState("");
  const [gender, setGender] = useState(person.gender);
  useEffect(() => {
    setAge(person.age.mean);
    setName("");
    setSurname("");
    setMidName("");
    setGender(person.gender);
  }, [person]);

  const url = "https://backend.facecloud.tevian.ru/api/v1/";

  const uploadPerson = async () => {
    try {
      const res = await axios.post(
        `${url}persons`,
        { data: { name, midName, surname, age }, database_id: user.db },
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      console.log(res);
      uploadPhoto(res.data.data.id);
    } catch (e) {
      console.log(e);
    }
  };

  const uploadPhoto = async (id) => {
    const position = [bbox.x, bbox.y, bbox.width, bbox.height];
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
      console.log(res);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <SettingsContainer>
      <label htmlFor={"name"}>Name</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label htmlFor={"midname"}>Middle Name</label>
      <input
        type="text"
        id="midname"
        value={midName}
        onChange={(e) => setMidName(e.target.value)}
      />

      <label htmlFor={"surname"}>Surname</label>
      <input
        type="text"
        id="surname"
        value={surname}
        onChange={(e) => setSurname(e.target.value)}
      />

      <label htmlFor={"age"}>Age</label>
      <input
        type="number"
        id="age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
      />
      <label htmlFor={"gender"}>Gender:</label>
      <br />
      <select
        style={{ fontSize: "20px", fontWeight: "700" }}
        onChange={(e) => setGender(e.target.value)}
      >
        <option selected={gender == "male"} value="male">
          &#128102; Male
        </option>
        <option selected={gender == "female"} value="female">
          &#128103; Female
        </option>
      </select>
      <br />

      <Button onClick={uploadPerson}>Save</Button>
    </SettingsContainer>
  );
};

export default PersonForm;
