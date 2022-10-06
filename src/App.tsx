import { Servers } from "./pages/Servers";
import { Channels } from "./pages/Channels";
import Container from "react-bootstrap/Container";

import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";

import "./App.css";

function App() {
  return (
    <Container fluid>
      <Tab.Container defaultActiveKey="channels">
        <Row>
          <Nav variant="tabs">
            <Nav.Item>
              <Nav.Link eventKey="channels">Channels</Nav.Link>
            </Nav.Item>
            <Nav.Item>
              <Nav.Link eventKey="servers">Servers</Nav.Link>
            </Nav.Item>
          </Nav>
        </Row>

        <Row>
          <Tab.Content>
            <Tab.Pane eventKey="channels">
              <Channels />
            </Tab.Pane>
            <Tab.Pane eventKey="servers">
              <Servers />
            </Tab.Pane>
          </Tab.Content>
        </Row>
      </Tab.Container>
    </Container>
  );
}

export default App;
