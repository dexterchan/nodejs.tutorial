import axios from "axios";

const tokenURL = "https://api.treequery.org/token";

export async function GetAwsJWTToken(apiKeyValue) {
  const API_KEY = apiKeyValue;
  let token = "";
  try {
    const response = await axios.get(tokenURL, {
      headers: {
        "x-api-key": API_KEY,
      },
    });

    if (response.status !== 200) {
      throw new Error("failed to retrieve token");
    }
    const body = response.data;
    token = body["jwt"];
  } catch (ex) {
    console.log("For demo, use dummy token");
    console.log(ex);
  }
  return token;
}
