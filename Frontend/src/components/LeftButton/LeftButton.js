import React, {Component} from 'react';
import {connect} from 'react-redux';
import IconAwesome from 'react-native-vector-icons/FontAwesome';
import IconAwesome5 from 'react-native-vector-icons/FontAwesome5';
import colors from '../../colors';
import strings from './strings';

class LeftButton extends Component {
  render() {
    //return a log in icon when user is signed out. Return a user icon when user signed in.
    return this.props.signedIn ? (
      <IconAwesome5
        style={{paddingRight: 10, paddingLeft: 8}}
        name="user-circle"
        size={30}
        color={colors.contrast}
        onPress={() => {
          this.props.navigation.navigate(strings.navigation.userProfile);
        }}
      />
    ) : (
      <IconAwesome
        style={{paddingRight: 10, paddingLeft: 8}}
        name="sign-in"
        size={30}
        color={colors.contrast}
        onPress={() => {
          this.props.navigation.navigate(strings.navigation.signIn);
        }}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    signedIn: state.signedIn,
  };
};

export default connect(mapStateToProps, null)(LeftButton);
