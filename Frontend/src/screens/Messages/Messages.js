import React, {Component} from 'react';
import {SafeAreaView, ScrollView, Text, View} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';

class Messages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
  }

  componentDidMount() {
    fetch(strings.messageApi)
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        const loggedInUser = this.props.user.username;
        msgArr = [];
        // getting messages addressed to the signed in user
        for (let msg in json) {
          json[msg].receiver === loggedInUser && msgArr.push(json[msg].content);
        }
        this.setState({
          messages: msgArr,
        });
      });
  }

  render() {
    const msgs = this.state.messages.map(e => {
      return (
        <View>
          <Text>{e}</Text>
        </View>
      );
    });
    return (
      <SafeAreaView style={styles.parent}>
        <ScrollView>{msgs}</ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(Messages);
