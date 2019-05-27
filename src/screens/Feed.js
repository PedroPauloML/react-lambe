import React, { Component } from "react"
import {
  StyleSheet,
  View,
  FlatList
} from "react-native"
import Header from "../Components/Header"
import Post from "../Components/Post"
import { connect } from "react-redux"

class Feed extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Header />
        <FlatList
          data={this.props.posts}
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

const mapStateToProps = ({ posts }) => {
  return {
    posts: posts.posts.sort(function (x,y) {return y.id - x.id}),
  }
}

// export default Feed
export default connect(mapStateToProps, null)(Feed)