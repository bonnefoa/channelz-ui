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
  if (error !== "") {
    return (
      <Alert dismissible onClose={() => setError("")} variant="danger">
        {error}
      </Alert>
    );
  }
  return null;
};
