import {Link, useHistory} from 'react-router-dom'
import {useSelector, useDispatch} from 'react-redux'
import { handleLogout } from '../../functions/auth'; 
import { Navbar, Nav, Button } from "react-bootstrap";

const Navigation = () => {
  const user = JSON.parse(useSelector(state => state.auth.user)) 
  const dispatch = useDispatch();
  const history = useHistory()

  return (
    <Navbar bg="dark" variant="dark">
      <Navbar.Brand href="#home">Tevian</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link><Link to="/">Home</Link></Nav.Link>
        <Nav.Link><Link to='/persons'>Persons</Link></Nav.Link>
      </Nav>
      {user && <Nav.Link>{user.email}</Nav.Link>}
      {user && <Button onClick={e => handleLogout(dispatch, history)}>Log out</Button>}
    </Navbar>
  );
};

export default Navigation;
