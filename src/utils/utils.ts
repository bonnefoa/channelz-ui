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
  setError: (e: string) => void,
  setData: (e: Type[]) => void
): void {
  setError("");
  const host = urlParameters.get("host");
  if (host === "") {
    return;
  }

  let emptyData: Type[] = [];
  fetch(`${REACT_APP_BACKEND_URL}/api/${endpoint}?${urlParameters}`)
    .then((httpRes) => httpRes.json())
    .then((res) => {
      if (res.error) {
        setData(emptyData);
        setError(res.error);
      } else {
        setData(res.data);
      }
    })
    .catch((e) => {
      setData(emptyData);
      setError(`Couldn't connect to ${host}: ${e.statusText}`);
    });
}
