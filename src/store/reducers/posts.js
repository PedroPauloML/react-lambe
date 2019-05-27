import { ADD_POST, ADD_COMMENT } from "../actions/actionTypes"

const initialState = {
  posts: [
    {
      id: Date.parse(new Date()),
      email: "pedropaulomarqz@gmail.com",
      nickname: "PedroPauloML",
      image: require("../../../assets/imgs/fence.jpg"),
      comments: [{
        nickname: "Mainha",
        comment: "Que lindo, meu filho!",
      },
      {
        nickname: "Painho",
        comment: "Vai trabalhar, vagabundo!",
      },]
    },
    {
      id: Date.parse(new Date()) + 1000,
      email: "pedropaulomarqz@gmail.com",
      nickname: "PedroPauloML",
      image: require("../../../assets/imgs/fence.jpg"),
      comments: []
    }
  ] 
}

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: state.posts.concat({
          ...action.payload
        })
      }
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post => {
          if (post.id === action.payload.postId) {
            if (post.comments) {
              post.comments = post.comments.concat(
                action.payload.comment
              )
            } else {
              post.comments = [action.payload.comment]
            }
          }
          return post
        })
      }
    default: 
      return state
  }
}

export default reducer