import { Endpoints } from "./endpoints";

export async function fetchDataFor(
  endpoint: Endpoints,
  pathparams: string[] = [],
  queryparams: string[] = []
): Promise<any[]> {
  console.log(
    endpoint + "/" + pathparams.join("/") + "?" + queryparams.join("&")
  );
  try {
    const data = await fetch(
      endpoint + "/" + pathparams.join("/") + "?" + queryparams.join("&"),
      {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    );
    console.log(data);
    const json = await data.json();
    console.log(json);
    return json;
  } catch (e) {
    console.log(e);
    return fetchDataFor(endpoint, pathparams, queryparams);
  }
}
