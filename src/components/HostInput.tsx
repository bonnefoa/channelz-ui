import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import InputGroup from "react-bootstrap/InputGroup";

interface HostInputProps {
  currentHost: string;
  setHost: (host: string) => void;
}

export const HostInput: React.FunctionComponent<HostInputProps> = ({
  currentHost,
  setHost,
}) => {
  const [tempHost, setTempHost] = React.useState("localhost:3333");
  return (
    <>
      <Row className="mb-3 mt-3">
        <Form as={Col} lg="5">
          <InputGroup>
            <InputGroup.Text>Channelz Endpoint:</InputGroup.Text>
            <Form.Control
              aria-label="host"
              value={tempHost}
              onChange={(e) => setTempHost(e.target.value)}
            />
            <Button
              variant="primary"
              onClick={() => {
                setHost(tempHost);
              }}
            >
              Submit
            </Button>
          </InputGroup>
        </Form>
      </Row>
      <Row className="mb-3 mt-3">
        <Col>Current endpoint: {currentHost}</Col>
      </Row>
    </>
  );
};
