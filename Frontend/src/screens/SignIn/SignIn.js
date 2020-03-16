import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  ImageBackground,
} from 'react-native';
import styles from './styles';
import IconAwesome from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import colors from '../../colors';
import strings from './strings';
import {signInOut} from '../../actions';
import {connect} from 'react-redux';
import backgroundImg from '../../images/backgroundWhite.png';
import SignInComponent from '../../components/SignIn';
import Device from 'react-native-device-detection';

class SignIn extends Component {
  render() {
    return (
      <ImageBackground
        style={styles.parent}
        resizeMode="cover"
        source={backgroundImg}>
        {/* icon */}
        <View style={styles.iconWrapper}>
          <IconAwesome
            name="dog"
            size={Device.isTablet ? 150 : 100}
            color={colors.primary}
          />
        </View>
        {/* sign in component */}
        <SignInComponent navigation={this.props.navigation} signUp={false} />
        {/* sign in with Facebook */}
        <View style={styles.facebookWrapper}>
          <TouchableHighlight
            style={styles.facebook}
            onPress={() =>
              this.props.navigation.navigate(
                strings.navigation.underConstruction,
              )
            }>
            <Text style={styles.facebookText}>{strings.signInFaceBook}</Text>
          </TouchableHighlight>
        </View>
        {/* new user link */}
        <View style={styles.privacyWrapper}>
          <Text>{strings.newMember}</Text>
          <Text
            style={{color: colors.dark}}
            onPress={() =>
              this.props.navigation.navigate(strings.navigation.signUp)
            }>
            {strings.signUp}
          </Text>
        </View>
      </ImageBackground>
    );
  }
}

export default SignIn;
