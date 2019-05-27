import React, { Component } from "react"
import {
  StyleSheet,
  View,
  FlatList
} from "react-native"
import Header from "../Components/Header"
import Post from "../Components/Post"

class Feed extends Component {
  state = {
    posts: [
      {
        id: Math.random(),
        email: "pedropaulomarqz@gmail.com",
        nickname: "PedroPauloML",
        image: require("../../assets/imgs/fence.jpg"),
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
        image: require("../../assets/imgs/fence.jpg"),
        comments: []
      }
    ] 
  }

  render() {
    return (
      <View style={styles.container}>
        <Header />
        <FlatList
          data={this.state.posts}
          keyExtractor={item => `${item.id}`}
          renderItem={({item}) => 
            <Post key={item.id} {...item} />} />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5fcff",
  }
})

export default Feed