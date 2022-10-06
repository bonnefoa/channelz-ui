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
      if (res.error) {
        setData([]);
        setErrors([
            "Error from Channelz-proxy.",
            res.error
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
