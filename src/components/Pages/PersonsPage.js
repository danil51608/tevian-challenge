import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"
import { PageContainer } from "../StyledComponents";
import PersonCard from "../UI/PersonCard";
import axios from "axios";

const PersonsPage = () => {
  const history = useHistory();
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
    if(user){
      getPersons();

    }
    else{
      history.push("/login"); //перенаправить на страницу входа, если вход не был выполнен
    }
  }, []);

  return (
    <PageContainer>
      {persons && persons.map(person => <PersonCard key={person.id} person={person.data} id={person.id} getPersons={getPersons}/>)}
      {persons.length < 1 && <h1>You haven't created any person yet!<br/>Create it <Link exact to='/'>here</Link></h1>}
    </PageContainer>
  );
};

export default PersonsPage;
