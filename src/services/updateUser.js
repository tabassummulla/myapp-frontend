import axios from "axios";
import config from "./axiosConfig";

const updateUserService = (
  accessToken,
  displayPicture,
  editDetails,
  aboutmeValue
) =>
  axios({
    ...config(accessToken),
    data: `
    mutation{
        addUser(
            id: ${editDetails.id}
            first_name: "${editDetails.first_name}"
            email: "${editDetails.email}"
            last_name: "${editDetails.last_name}"
            about_me: "${aboutmeValue}"
            profile_pic: "${displayPicture}"
        ) { 
            id
            first_name
            email
            last_name
            profile_pic
            about_me}
    }`
  }).then(res => res.data);

export default updateUserService;
