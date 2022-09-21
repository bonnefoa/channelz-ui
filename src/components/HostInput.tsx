import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import * as React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

interface HostInputProps {
  setHost: (host: string) => void;
}

export const HostInput: React.FunctionComponent<HostInputProps> = ({
  setHost,
}) => {
  const [tempHost, setTempHost] = React.useState("localhost:3333");
  return (
    <Form>
      <Form.Group as={Row} controlId="formHostInput">
        <Form.Label column sm="2">
          Channelz Endpoint:
        </Form.Label>
        <Col sm="2">
          <Form.Control
            value={tempHost}
            onChange={(e) => setTempHost(e.target.value)}
          />
        </Col>
      </Form.Group>

      <Button
        variant="primary"
        onClick={() => {
          setHost(tempHost);
        }}
      >
        Submit
      </Button>
    </Form>
  );
};
