import React, {Component} from 'react'
import {View, Text, StyleSheet} from 'react-native'
import { Icon } from 'react-native-elements'
import {connect} from 'react-redux'
import axios from 'axios';

class Content extends Component{
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

async vote(type){
  console.log('HIT VOTE METHOD')
  let body = {
    userId: this.props.userId
  }
  type ? await axios.post(`http://localhost:3001/api/upvote/${this.props.postId}`, body) : 
   await axios.post(`http://localhost:3001/api/downvote/${this.props.postId}`, body)

   axios(`http://localhost:3001/api/post/${this.props.postId}`)
   .then(res => this.setState({content: res.data.post[0], comments: res.data.comments, isLoading: false}, () => this.getRep(res.data.post)))
   .catch(err => console.log(err))

}

  render(){
    let comments = this.state.comments.map((comment, i) => {
      return(
          <Text key={i}>{`COMMENT ${i+1}: ${comment.comment_body}`}</Text>   
      )
    })
    return(
      <View style={styles.container}>
        <Text>{`TITLE: ${this.state.content.title}`}</Text>
        <Text style={{marginTop: 25, marginBottom: 25}}>{`BODY: ${this.state.content.body}`}</Text>
          <Icon
              name='keyboard-arrow-up'
              color='green'
              onPress={() => this.vote(true)}
              />
          <Text>{`${this.state.rep}`}</Text>
          <Icon
              name='keyboard-arrow-down'
              color='red'
              onPress={() => this.vote()}
              />
        <View style={{marginTop: 25}}>
          {comments}
        </View>
      </View>
    )
  }
}

export default connect(state => state)(Content)

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
