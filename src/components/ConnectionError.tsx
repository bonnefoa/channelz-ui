import React from "react";
import Alert from "react-bootstrap/Alert";

type ConnectionErrorProps = {
  errors: string[];
  setErrors: (e: string[]) => void;
};

export const ConnectionError: React.FunctionComponent<ConnectionErrorProps> = ({
  errors,
  setErrors,
}) => {
  if (errors.length > 0) {
    return (
      <Alert dismissible onClose={() => setErrors([])} variant="danger">
        {errors.map(error => (
            <div key={error}>
            {error}<br/>
            </div>
        ))}
      </Alert>
    );
  }
  return null;
};
