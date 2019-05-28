import {
  USER_LOGGED_IN,
  USER_LOGGED_OUT,
  LOADING_USER,
  USER_LOADED
} from "./actionTypes"
import axios from "axios"
import { setMessage } from "./message"

const authBaseURL = "https://www.googleapis.com/identitytoolkit/v3/relyingparty"
const API_KEY = "AIzaSyAsAmV3mU3AGkqQpJI4E7uqwEk-bdgd5No"

export const userLogged = user => {
  return {
    type: USER_LOGGED_IN,
    payload: user,
  }
}

export const logout = () => {
  return {
    type: USER_LOGGED_OUT
  }
}

export const createUser = (user) => {
  return dispatch => {
    axios.post(`${authBaseURL}/signupNewUser?key=${API_KEY}`, {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    })
      .catch(err => dispatch(setMessage({
        title: "Erro!",
        text: `[${err.response.data.error.code}] ${err.response.data.error.errors.map(error => error.message).join("; ")}`
      })))
      .then(res => {
        if (res.data.localId) {
          axios.put(`/users/${res.data.localId}.json`, {
            name: user.name
          })
            .catch(err => dispatch(setMessage({
              title: "Erro!",
              text: `[${err.response.data.error.code}] ${err.response.data.error.errors.map(error => error.message).join("; ")}`
            })))
            .then(res => {
              dispatch(setMessage({
                title: "Sucesso!",
                text: "Usuário cadastrado com sucesso!"
              }))
            })
        }
      })
  }
}

export const loadingUser = () => {
  return {
    type: LOADING_USER
  }
}

export const userLoaded = () => {
  return {
    type: USER_LOADED
  }
}

export const login = user => {
  return dispatch => {
    dispatch(loadingUser())
    axios.post(`${authBaseURL}/verifyPassword?key=${API_KEY}`, {
      email: user.email,
      password: user.password,
      returnSecureToken: true
    })
      .catch(err => {
        dispatch(setMessage({
          title: "Erro!",
          text: `[${err.response.data.error.code}] ${err.response.data.error.errors.map(error => error.message).join("; ")}`
        }))
      })
      .then(res => {
        if (res.data.localId) {
          axios.get(`/users/${res.data.localId}.json`)
          .catch(err => dispatch(setMessage({
            title: "Erro!",
            text: `[${err.response.data.error.code}] ${err.response.data.error.errors.map(error => error.message).join("; ")}`
          })))
          .then(res => {
            user.password = null
            user.name = res.data.name
            dispatch(userLogged(user))
            dispatch(userLoaded())
          })
        }
      })
  }
}