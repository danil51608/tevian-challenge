import { Container, Row, Col } from "react-bootstrap";
import Registration from "./components/Auth/Registration";
import Login from "./components/Auth/Login";
import Navigation from './components/Navigation/Navigation'
import HomePage from './components/Pages/HomePage'
import PersonsPage from './components/Pages/PersonsPage'
import { Switch, Route } from "react-router-dom";

function App() {
  return (
    <Container>
      <Navigation />
      <Switch>
        <Route path="/register" component={Registration} />
        <Route path="/login" component={Login} />
        <Route path='/persons' component={PersonsPage}/>
        <Route exact path='/' component={HomePage}/>
      </Switch>
    </Container>
  );
}

export default App;
