import { ADD_POST, ADD_COMMENT } from "./actionTypes"
import axios from "axios"

export const addPost = post => {
  return dispatch => {
    // https://us-central1-lambe-e36d9.cloudfunctions.net/uploadImage
    axios({
      url: "uploadImage",
      baseURL: "https://us-central1-lambe-e36d9.cloudfunctions.net",
      method: "post",
      data: {
        image: post.image.base64
      }
    })
      .catch(err => console.log(err))
      .then(response => {
        console.debug(response)
        post.image = response.data.imageUrl
        axios.post("/posts.json", { ...post })
          .catch(err => console.log(err))
          .then(res => console.log(res.data))
      })
  }
  // return {
  //   type: ADD_POST,
  //   payload: post
  // }
}

export const addComment = payload => {
  return {
    type: ADD_COMMENT,
    payload
  }
}
