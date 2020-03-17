/**
 * User Profile Notes
 *
 * Users can sign up via the sign up page.
 * Existing users can sign in via the sign in page.
 * Non existing users cannot sign in via the sign in page.
 * User details are stored in redux only while signed in.
 *
 * TODO
 * Encrypt passwords
 * Allow users to enter their first name, last name and location
 * Allow users to change their details
 * User picker instead of CharField for location
 * Make it so that email address works as primary key and get rid of usernames
 * Implement character limits on user details
 * Implement password constraints
 *
 */

import React, {Component} from 'react';
import {connect} from 'react-redux';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  KeyboardAvoidingView,
} from 'react-native';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import styles from './styles';
import colors from '../../colors';
import {signInOut, setUser} from '../../actions';
import strings from './strings';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: 'Test',
        last_name: 'User',
        username: '',
        location: 'SA',
        password: '',
      },
    };
  }

  onChangeUsername(text) {
    this.setState({
      user: {
        first_name: this.state.user.first_name,
        last_name: this.state.user.last_name,
        username: text,
        location: this.state.user.location,
        password: this.state.user.password,
      },
    });
  }

  onChangePassword(text) {
    this.setState({
      user: {
        first_name: this.state.user.first_name,
        last_name: this.state.user.last_name,
        username: this.state.user.username,
        location: this.state.user.location,
        password: text,
      },
    });
  }

  updateBackend() {
    // figure out if signing up or signing in
    if (this.props.signUp) {
      fetch('http://127.0.0.1:8000/end_user/end_user/', {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(this.state.user),
      })
        .then(() => {
          this.props.setUser(this.state.user);
        })
        .then(() => {
          this.props.signInOut();
          this.props.navigation.navigate(strings.navigation.home);
        })
        .catch(e => console.log(e));
    } else {
      fetch(
        `http://127.0.0.1:8000/end_user/end_user/${this.state.user.username}/`,
      )
        .then(resp => {
          return resp.json();
        })
        .then(json => {
          //reject users which do not already exist
          if (typeof json.username === 'undefined') {
            throw 'User does not exist';
          } else {
            user = {
              first_name: json.first_name,
              last_name: json.last_name,
              username: json.username,
              location: json.location,
              password: json.password,
            };
            this.props.setUser(user);
          }
        })
        .then(() => {
          this.props.signInOut();
          this.props.navigation.navigate(strings.navigation.home);
        })
        .catch(e => console.log(`ERROR! ${e}`));
    }
  }

  render() {
    return (
      <KeyboardAvoidingView style={{flex: 3}} behavior="padding" enabled>
        {/* username */}
        <View style={styles.usernameWrapper}>
          <View style={styles.textInput}>
            <IconAwesome
              name="user"
              size={30}
              color={colors.primary}
              style={styles.inputIcon}
            />
            {/* textContentType is for autofill  */}
            <TextInput
              textContentType="username"
              placeholder={strings.username}
              style={styles.inputText}
              onChangeText={text => this.onChangeUsername(text)}
            />
          </View>
        </View>
        {/* password */}
        <View style={styles.passwordWrapper}>
          <View style={styles.textInput}>
            <IconMCI
              name="textbox-password"
              size={30}
              color={colors.primary}
              style={styles.inputIcon}
            />
            {/* textContentType is for autofill use newPassword for sign up page */}
            <TextInput
              textContentType="password"
              placeholder={strings.password}
              secureTextEntry={true}
              style={styles.inputText}
              onChangeText={text => this.onChangePassword(text)}
            />
          </View>
        </View>
        {/* sign in */}
        <View style={styles.signInWrapper}>
          <TouchableHighlight
            style={styles.signIn}
            onPress={() => {
              this.updateBackend();
            }}
            underlayColor={colors.dark}>
            <Text style={styles.signInText}>{strings.signIn}</Text>
          </TouchableHighlight>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    signInOut: () => {
      dispatch(signInOut());
    },
    setUser: user => {
      dispatch(setUser(user));
    },
  };
};

export default connect(null, mapDispatchToProps)(SignIn);
