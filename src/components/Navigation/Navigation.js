import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { handleLogout } from "../../functions/auth";
import { Navbar, Nav } from "react-bootstrap";
import { Button } from "../StyledComponents/index";

const Navigation = () => {
  const user = JSON.parse(useSelector((state) => state.auth.user));
  const dispatch = useDispatch();
  const history = useHistory();

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Tevian</Navbar.Brand>
      <Navbar.Toggle aria-controls="navbarScroll" />
      <Navbar.Collapse id="navbarScroll">
        <Nav
          className="mr-auto my-2 my-lg-0"
          style={{ maxHeight: "30vh", alignItems: "center" }}
          navbarScroll
        >
          <Nav>
            <Link exact to="/">Home</Link>
          </Nav>
          &nbsp;&nbsp;
          <Nav>
            <Link to="/persons">Persons</Link>
          </Nav>
        </Nav>
        <Nav style={{ maxHeight: "30vh", alignItems: "center" }}>
          {user && <Nav.Link>{user.email}</Nav.Link>}
          {user && (
            <Button onClick={(e) => handleLogout(dispatch, history)}>
              Log out
            </Button>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
