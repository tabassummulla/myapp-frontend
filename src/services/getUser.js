import axios from "axios";
import config from "./axiosConfig";

const getUserService = (accessToken, email) =>
  axios({
    ...config(accessToken),
    data: `query{
        userByEmail(email: "${email}"){
        profile_pic
        id
        first_name
        last_name
        email
        about_me
        }
        }`
  }).then(res => res.data);

export default getUserService;
