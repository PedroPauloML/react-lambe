import { ADD_POST } from "../actions/actionTypes"

const initialState = {
  posts: [
    {
      id: Math.random(),
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
      id: Math.random(),
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
    default: 
      return state
  }
}

export default reducer