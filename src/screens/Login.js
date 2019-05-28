import React, { Component } from "react"
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity
} from "react-native"
import { connect } from "react-redux"
import { login } from "../store/actions/user"

class Login extends Component {
  state = {
    name: "Temporário",
    email: "",
    password: ""
  }

  componentDidUpdate = prevProps => {
    if (prevProps.isLoading && !this.props.isLoading) {
      this.props.navigation.navigate("Profile")
    }
  }

  login = () => {
    this.props.onLogin({ ...this.state })
    // this.props.navigation.navigate("Profile")
  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput placeholder="E-mail" style={styles.input}
          autoFocus={true} keyboardType="email-address"
          value={this.state.email}
          onChangeText={email => this.setState({ email })} />
        <TextInput placeholder="Senha" style={styles.input}
          secureTextEntry={true} value={this.state.password}
          onChangeText={password => this.setState({ password })} />
        <TouchableOpacity 
          onPress={this.login} 
          disabled={this.props.isLoading}
          style={[
            styles.button,
            this.props.isLoading ? styles.buttonDisabled : null
          ]}>
          <Text style={styles.buttonText}>
            {this.props.isLoading ? "Verificando credenciais..." : "Login"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            this.props.navigation.navigate("Register")
          }} 
          disabled={this.props.isLoading}
          style={[
            styles.button,
            this.props.isLoading ? styles.buttonDisabled : null
          ]}>
          <Text style={styles.buttonText}>Criar nova conta</Text>
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
  },
  buttonDisabled: {
    backgroundColor: "#aaa"
  }
})

const mapStateToProps = ({ user }) => {
  return {
    isLoading: user.isLoading
  }
} 

const mapDispatchToProps = dispatch => {
  return {
    onLogin: user => dispatch(login(user))
  }
}

// export default Login
export default connect(mapStateToProps, mapDispatchToProps)(Login)