import { Endpoints } from "./endpoints";

export async function fetchDataFor(
  endpoint: Endpoints,
  pathparams: string[] = [],
  queryparams: string[] = []
): Promise<any[]> {
  const data = await fetch(
    endpoint + "/" + pathparams.join("/") + "?" + queryparams.join("&")
  );
  const json = await data.json();
  console.log(json, endpoint + "/" + queryparams.join("/"));
  return json;
}
