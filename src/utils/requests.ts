export async function postData<DataType>(
  url: string,
  data = {},
  signal?: AbortSignal
): Promise<DataType> {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
    signal,
  });
  return response.json();
}

export async function patchData<DataType>(
  url: string,
  data = {}
): Promise<DataType> {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "PATCH",
    mode: "cors",
    cache: "no-cache",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },
    redirect: "follow",
    referrerPolicy: "no-referrer",
    body: JSON.stringify(data),
  });
  return response.json();
}

export async function getData<DataType>(url: string): Promise<DataType> {
  const response = await fetch(url);
  return response.json();
}
