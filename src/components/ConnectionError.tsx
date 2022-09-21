import React from "react";
import Alert from "react-bootstrap/Alert";

type ConnectionErrorProps = {
  error: string;
  setError: (e: string) => void;
};

export const ConnectionError: React.FunctionComponent<ConnectionErrorProps> = ({
  error,
  setError,
}) => {
    console.log(error)
  if (error !== "") {
    return (
      <Alert dismissible onClose={() => setError("")} variant="danger">
        {error}
      </Alert>
    );
  }
  return null;
};
