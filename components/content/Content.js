import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import axios from 'axios';

export default class Content extends Component{
  constructor(){
    super()

    this.state = {
      content: {},
      comments: [],
      upvotes: 0,
      downvotes: 0,
      rep: 0,
      isLoading: true
    }
  }

  componentDidMount(){
    axios(`http://localhost:3001/api/post/${this.props.postId}`)
    .then(res => this.setState({content: res.data.post[0], comments: res.data.comments, isLoading: false}, () => this.getRep(res.data.post)))
    .catch(err => console.log(err))
  }

  getRep(reputation){
    let upvotes = 0
    let downvotes = 0
    for(let i = 0; i <reputation.length; i++){
      reputation[i].upvote > 0 ?
      upvotes++ : reputation[i].downvote > 0 ? 
      downvotes++ : null
    }
    this.setState({
      upvotes,
      downvotes,
      rep: (upvotes - downvotes)
    })
  }


  render(){
    let comments = this.state.comments.map((comment, i) => {
      return(
        <View key={i}>
          <Text>{`COMMENT ${i+1}: ${comment.comment_body}`}</Text>
        </View>
      )
    })
    return(
      <View style={styles.container}>
        <Text>{`TITLE: ${this.state.content.title}`}</Text>
        <Text>{`BODY: ${this.state.content.body}`}</Text>
        <Text>{`REP: ${this.state.rep}`}</Text>
        <Text>{`UPVOTES: ${this.state.upvotes}`}</Text>
        <Text>{`DOWNVOTES: ${this.state.downvotes}`}</Text>
        {comments}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: "center",
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
