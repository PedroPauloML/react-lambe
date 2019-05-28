import {
  SET_POSTS,
  ADD_COMMENT,
  CREATING_POST,
  POST_CREATED
} from "./actionTypes"
import axios from "axios"

export const addPost = post => {
  return (dispatch, getState) => {
    dispatch(creatingPost())
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
        axios.post(`/posts.json?auth=${getState().user.token}`, { ...post })
          .catch(err => console.log(err))
          .then(res => {
            dispatch(fetchPosts())
            dispatch(postCreated())
          })
      })
  }
  // return {
  //   type: ADD_POST,
  //   payload: post
  // }
}

export const addComment = payload => {
  return (dispatch, getState) => {
    axios.get(`/posts/${payload.postId}.json`)
      .catch(err => console.log(err))
      .then(res => {
        const comments = res.data.comments || []
        comments.push(payload.comment)
        axios.patch(`/posts/${payload.postId}.json?auth=${getState().user.token}`, { comments })
          .catch(err => console.log(err))
          .then(res => {
            dispatch(fetchPosts())
          })
      })
  }
  // return {
  //   type: ADD_COMMENT,
  //   payload
  // }
}

export const setPosts = posts => {
  return {
    type: SET_POSTS,
    payload: posts
  }
}

export const fetchPosts = () =>{
  return dispatch => {
    axios.get("/posts.json")
      .catch(err => console.log(err))
      .then(res => {
        const rawPosts = res.data
        const posts = []
        for(let key in rawPosts) {
          posts.push({
            ...rawPosts[key],
            id: key
          })
        }
        dispatch(setPosts(posts.reverse()))
      })
  }
}

export const creatingPost = () => {
  return {
    type: CREATING_POST
  }
}

export const postCreated = () => {
  return {
    type: POST_CREATED
  }
}