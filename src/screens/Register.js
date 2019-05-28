import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native"
import { connect } from "react-redux"
import { createUser } from "../store/actions/user"

class Register extends Component {
  state = {
    name: "",
    email: "",
    password: "",
  }

  componentDidMount() {
    this.props.navigation.addListener('willFocus', (playload)=>{
      if (this.props.email) {
        this.props.navigation.navigate("Profile")
      }
    })
  }

  componentDidUpdate = prevProps => {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.setState({
        name: "",
        email: "",
        password: "",
      })
      this.props.navigation.navigate("Feed")
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder="Nome" style={styles.input}
          autoFocus={true}
          value={this.state.name}
          onChangeText={name => this.setState({ name })} />
        <TextInput placeholder="E-mail" style={styles.input}
          keyboardType="email-address"
          value={this.state.email}
          onChangeText={email => this.setState({ email })} />
        <TextInput placeholder="Senha" style={styles.input}
          secureTextEntry={true} value={this.state.password}
          onChangeText={password => this.setState({ password })} />
        <TouchableOpacity
          onPress={() => { this.props.onCreateUser(this.state) }} 
          disabled={this.props.isLoading}
          style={[
            styles.button,
            this.props.isLoading ? styles.buttonDisabled : null
          ]}>
          <Text style={styles.buttonText}>
            {this.props.isLoading ? "Salvando..." : "Salvar"}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    marginTop: 30,
    padding: 10,
    backgroundColor: "#4286f4",
  },
  buttonText: {
    fontSize: 20,
    color: "#fff",
  },
  input: {
    marginTop: 20,
    width: "90%",
    backgroundColor: "#eee",
    height: 40,
    borderWidth: 1,
    borderColor: "#333",
    paddingLeft: 15
  },
  buttonDisabled: {
    backgroundColor: "#aaa"
  }
})

const mapStateToProps = ({ user }) => {
  return {
    email: user.email,
    name: user.name,
    isLoading: user.isLoading,
  }
} 

const mapDispatchToProps = dispatch => {
  return {
    onCreateUser: user => dispatch(createUser(user))
  }
}

// export default Register
export default connect(mapStateToProps, mapDispatchToProps)(Register)