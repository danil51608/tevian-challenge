import { useEffect } from "react";
import axios from "axios";

const PersonsPage = () => {

    const getPersons = async () => {
        const url = 'https://backend.facecloud.tevian.ru/api/v1/'
        try{

        }
        catch(e){

        }
    }

  useEffect(() => {
      getPersons()
  }, []);

  return <div>Person List</div>;
};

export default PersonsPage;
