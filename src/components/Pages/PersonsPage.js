import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { PageContainer } from "../StyledComponents";
import PersonCard from "../UI/PersonCard";
import axios from "axios";

const PersonsPage = () => {
  const user = JSON.parse(useSelector((state) => state.auth.user));
  const [persons, setPersons] = useState([]);

  const getPersons = async () => {
    const url = "https://backend.facecloud.tevian.ru/api/v1/";
    try {
      const res = await axios.get(`${url}databases/${user.db}/persons`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPersons(res.data.data);
      console.log(res.data.data);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPersons();
  }, []);

  return (
    <PageContainer>
      {persons.map(person => <PersonCard key={person.id} person={person.data} id={person.id}/>)}
    </PageContainer>
  );
};

export default PersonsPage;
