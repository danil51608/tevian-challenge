import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import {Alert, Spinner} from "react-bootstrap";
import { useSelector } from "react-redux";
import {Link} from "react-router-dom"
import { PageContainer } from "../StyledComponents";
import PersonCard from "../UI/PersonCard";
import axios from "axios";

const PersonsPage = () => {
  const user = JSON.parse(useSelector((state) => state.auth.user));
  const loading = useSelector((state) => state.auth.loader)
  const history = useHistory();
  const [loader, setLoader] = useState(false)
  const [persons, setPersons] = useState([]);
  const [error, setError] = useState('');

  //get persons information
  const getPersons = async () => {
    setLoader(true); //turn loader on
    const url = "https://backend.facecloud.tevian.ru/api/v1/";
    try {
      const res = await axios.get(`${url}databases/${user.db}/persons`, {
        headers: { Authorization: `Bearer ${user.token}` },
      });
      setPersons(res.data.data);
    } catch (e) {
      setError('Error getting persons!') //set error
    }
    finally{
      setLoader(false); //turn loader off
    }
  };

  //get persons if authorized, redirect to login page if not
  useEffect(() => {
    if(user){
      getPersons();
    }
    else{
      history.push("/login"); //redirect to login page
    }
  }, []);

  return (
    <PageContainer>
      {persons && persons.map(person => <PersonCard key={person.id} person={person.data} id={person.id} getPersons={getPersons}/>)}
      {(persons.length < 1 && !loader) && <h1>You haven't created any person yet!<br/>Create it <Link exact to='/'>here</Link></h1>}
      {loader && <Spinner animation="border" variant="primary" />}
      {error && <Alert variant="danger">{error}</Alert>}
    </PageContainer>
  );
};

export default PersonsPage;
