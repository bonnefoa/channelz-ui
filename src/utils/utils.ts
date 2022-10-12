import type { Timestamp } from "../types/CommonTypes";
const REACT_APP_BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export function connectivityStateStr(state_id: number): string {
  switch (state_id) {
    case 0:
      return "Unknown";
    case 1:
      return "Idle";
    case 2:
      return "Connecting";
    case 3:
      return "Ready";
    case 4:
      return "Transient Failure";
    case 5:
      return "Shutdown";
  }
  return "Unknown state";
}

export function channelStateToClass(state_id: number): string {
  switch (state_id) {
    case 0:
      return "bg-warning";
    case 1:
      return "bg-light";
    case 2:
      return "bg-light";
    case 3:
      return "bg-success";
    case 4:
      return "bg-danger";
    case 5:
      return "bg-light";
  }
  return "bg-light";
}

export function timestampToDate(timestamp: Timestamp): string {
  if (timestamp.seconds <= 0) {
    return "-";
  }
  const date = new Date(timestamp.seconds * 1000);
  return date.toISOString();
}

export function getBackendData<Type>(
  endpoint: string,
  urlParameters: URLSearchParams,
  setErrors: (e: string[]) => void,
  setData: (e: Type[]) => void
): void {
  setErrors([]);
  const host = urlParameters.get("host");
  if (host === "") {
    return;
  }

  let url = `${REACT_APP_BACKEND_URL}api/${endpoint}?${urlParameters}`;
  fetch(url)
    .then((httpRes) => {
      return httpRes.json();
    })
    .then((res) => {
      if (res.message) {
        setData([]);
        setErrors([
            "Error from Channelz-proxy.",
            `gRPC error code: ${res.code}`,
            `Details: ${res.details}`,
            `Message: ${res.message}`,
        ]);
      } else {
        setData(res.data);
      }
    })
    .catch((e) => {
      setData([]);
      setErrors([
        "Error when trying to fetch data from channelz-proxy.",
        `Url: ${url}.`,
        `Error: "${e}"`,
      ]);
    });
}
