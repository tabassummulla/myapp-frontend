const ENDPOINT = "http://localhost:8080/graphql";

const config = accessToken => ({
  url: ENDPOINT,
  method: "POST",
  headers: {
    "Content-Type": "text/plain",
    Authorization: `Bearer ${accessToken}`
  }
});
export default config;
