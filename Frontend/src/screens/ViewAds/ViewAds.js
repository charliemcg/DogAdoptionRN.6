import React, {Component} from 'react';
import {View, Text, SafeAreaView, ScrollView} from 'react-native';
import styles from './styles';
import {connect} from 'react-redux';
import strings from './strings';

class ViewAds extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dogs: [],
    };
  }

  componentDidMount() {
    fetch(strings.dogApi)
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        const loggedInUser = this.props.user.username;
        dogArr = [];
        // getting dogs which were posted by the signed in user
        for (let dog in json) {
          json[dog].user === loggedInUser && dogArr.push(json[dog]);
        }
        console.log(`results: ${dogArr}`);
        this.setState({
          dogs: dogArr,
        });
      });
  }

  render() {
    const dogResults = this.state.dogs.map(e => {
      return (
        <View>
          <Text>{e.breed}</Text>
          <Text>{e.price}</Text>
          <Text>{e.description}</Text>
        </View>
      );
    });
    return (
      <SafeAreaView style={styles.parent}>
        <ScrollView>{dogResults}</ScrollView>
      </SafeAreaView>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
  };
};

export default connect(mapStateToProps, null)(ViewAds);
