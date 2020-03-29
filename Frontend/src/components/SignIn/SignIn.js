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
import ModalSelector from 'react-native-modal-selector';

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        first_name: '',
        last_name: '',
        username: '',
        location: 'VIC',
        password: '',
      },
      showExtendedDetails: false,
      errors: {
        username: false,
        password: false,
        first_name: false,
        last_name: false,
      },
    };
  }

  onChangeUsername(text) {
    this.setState({
      // user: {
      //   first_name: this.state.user.first_name,
      //   last_name: this.state.user.last_name,
      //   username: text,
      //   location: this.state.user.location,
      //   password: this.state.user.password,
      // },
      user: {
        ...this.state.user,
        username: text,
      },
      errors: {
        ...this.state.errors,
        username: false,
      },
    });
  }

  onChangePassword(text) {
    this.setState({
      // user: {
      //   first_name: this.state.user.first_name,
      //   last_name: this.state.user.last_name,
      //   username: this.state.user.username,
      //   location: this.state.user.location,
      //   password: text,
      // },
      user: {
        ...this.state.user,
        password: text,
      },
      errors: {
        ...this.state.errors,
        password: false,
      },
    });
  }

  onChangeFirstName(text) {
    this.setState({
      // user: {
      //   first_name: text,
      //   last_name: this.state.user.last_name,
      //   username: this.state.user.username,
      //   location: this.state.user.location,
      //   password: this.state.user.password,
      // },
      user: {
        ...this.state.user,
        first_name: text,
      },
      errors: {
        ...this.state.errors,
        first_name: false,
      },
    });
  }

  onChangeLastName(text) {
    this.setState({
      // user: {
      //   first_name: this.state.user.first_name,
      //   last_name: text,
      //   username: this.state.user.username,
      //   location: this.state.user.location,
      //   password: this.state.user.password,
      // },
      user: {
        ...this.state.user,
        last_name: text,
      },
      errors: {
        ...this.state.errors,
        last_name: false,
      },
    });
  }

  onChangeLocation(text) {
    this.setState({
      // user: {
      //   first_name: this.state.user.first_name,
      //   last_name: this.state.user.last_name,
      //   username: this.state.user.username,
      //   location: text,
      //   password: this.state.user.password,
      // },
      user: {
        ...this.state.user,
        location: text,
      },
    });
  }

  // ensure username and/or password is not null
  validateStageOne() {
    // check that input fields are not null
    if (
      this.state.user.username.length > 0 &&
      this.state.user.password.length > 0
    ) {
      // sign in existing user or ask new user for more details
      !this.props.signUp
        ? this.signInExistingUser()
        : this.setState({showExtendedDetails: true});
    } else {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          username: this.state.user.username.length === 0 ? true : false,
          password: this.state.user.password.length === 0 ? true : false,
        },
      });
    }
  }

  // ensure first and/or last name is not null
  validateStageTwo() {
    // check that input fields are not null
    if (
      this.state.user.first_name.length > 0 &&
      this.state.user.last_name.length > 0
    ) {
      // check that user doesn't already exist
      this.checkUserIsNew();
    } else {
      this.setState({
        ...this.state,
        errors: {
          ...this.state.errors,
          first_name: this.state.user.first_name.length === 0 ? true : false,
          last_name: this.state.user.last_name.length === 0 ? true : false,
        },
      });
    }
  }

  checkUserIsNew() {
    fetch(`${strings.userApi}${this.state.user.username}/`)
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        if (typeof json.username === strings.undefined) {
          this.signUpNewUser();
        } else {
          throw strings.error.userAlreadyExists;
        }
      })
      .catch(e => {
        console.log(e);
        if (e === strings.error.userAlreadyExists) {
          alert(strings.error.userAlreadyExists);
        } else {
          alert(strings.error.genericError);
        }
      });
  }

  signUpNewUser() {
    fetch(strings.userApi, {
      method: 'POST',
      headers: {
        Accept: strings.applicationJson,
        'Content-Type': strings.applicationJson,
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
  }

  signInExistingUser() {
    fetch(`${strings.userApi}${this.state.user.username}/`)
      .then(resp => {
        return resp.json();
      })
      .then(json => {
        //reject users which do not exist
        if (typeof json.username === strings.undefined) {
          throw strings.error.userNotExist;
        } else if (json.username !== this.state.user.password) {
          throw strings.error.passwordWrong;
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
      .catch(e => {
        console.log(e);
        if (e === strings.error.userNotExist) {
          alert(`${strings.error.noAccount} ${this.state.user.username}.`);
        } else if (e === strings.error.passwordWrong) {
          alert(strings.error.incorrectPassword);
        } else {
          alert(strings.error.genericError);
        }
      });
  }

  getErrorMessage = text => {
    return (
      <View style={styles.errorMessage}>
        <Text style={styles.errorText}>{text}</Text>
      </View>
    );
  };

  render() {
    locations = ['QLD', 'NSW', 'VIC', 'NT', 'WA', 'SA', 'ACT', 'TAS'];
    const pickerItems = locations.map((val, i) => {
      return {key: i, label: val};
    });

    signUpButton = (
      <View style={styles.signInWrapper}>
        <TouchableHighlight
          style={styles.signIn}
          onPress={() => {
            {
              /* determine how the button should behave based on if new or existing user and where they are in the sign up process */
            }
            !this.props.signUp
              ? this.validateStageOne()
              : !this.state.showExtendedDetails
              ? //this.setState({showExtendedDetails: true})
                this.validateStageOne()
              : // : this.signUpNewUser();
                this.validateStageTwo();
          }}
          underlayColor={colors.dark}>
          <Text style={styles.signInText}>
            {/* determine what text to display on the button based on if new or existing user and where they are in the sign up process */}
            {!this.props.signUp
              ? strings.signIn
              : !this.state.showExtendedDetails
              ? strings.continue
              : strings.signUp}
          </Text>
        </TouchableHighlight>
      </View>
    );

    stageOne = (
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
              maxLength={18}
              onChangeText={text => this.onChangeUsername(text)}
            />
          </View>
        </View>
        {/* error */}
        {this.state.errors.username &&
          this.getErrorMessage(strings.usernameRequired)}
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
              maxLength={18}
              onChangeText={text => this.onChangePassword(text)}
            />
          </View>
        </View>
        {/* error */}
        {this.state.errors.password &&
          this.getErrorMessage(strings.passwordRequired)}
        {/* sign in */}
        {signUpButton}
      </KeyboardAvoidingView>
    );

    stageTwo = (
      <KeyboardAvoidingView style={{flex: 3}} behavior="padding" enabled>
        {/* firstname */}
        <View style={styles.firstNameWrapper}>
          <View style={styles.textInput}>
            <TextInput
              placeholder={strings.firstName}
              style={styles.inputText}
              onChangeText={text => this.onChangeFirstName(text)}
            />
          </View>
        </View>
        {/* error */}
        {this.state.errors.first_name &&
          this.getErrorMessage(strings.firstNameRequired)}
        {/* lastname */}
        <View style={styles.lastNameWrapper}>
          <View style={styles.textInput}>
            <TextInput
              placeholder={strings.lastName}
              style={styles.inputText}
              onChangeText={text => this.onChangeLastName(text)}
            />
          </View>
        </View>
        {/* error */}
        {this.state.errors.last_name &&
          this.getErrorMessage(strings.lastNameRequired)}
        {/* location */}
        <View style={styles.locationWrapper}>
          <ModalSelector
            data={pickerItems}
            initValue={this.state.user.location}
            onChange={value => {
              this.onChangeLocation(value.label);
            }}
            style={styles.style}
            selectStyle={styles.selectStyle}
            selectTextStyle={styles.selectTextStyle}
            optionTextStyle={styles.optionTextStyle}
          />
        </View>
        {/* sign in */}
        {signUpButton}
      </KeyboardAvoidingView>
    );

    return !this.state.showExtendedDetails ? stageOne : stageTwo;
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
