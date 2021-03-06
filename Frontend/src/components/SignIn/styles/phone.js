import colors from '../../../colors';
import {Dimensions} from 'react-native';

const width = Dimensions.get('window').width;
const componentWidth = width * 0.7;
const componentHeight = width * 0.15;

export default {
  parent: {
    flex: 3,
  },
  usernameWrapper: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  passwordWrapper: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  firstNameWrapper: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  lastNameWrapper: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationWrapper: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textInput: {
    width: componentWidth,
    height: componentHeight,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderBottomStyle: 'solid',
    borderBottomColor: colors.primary,
    borderBottomWidth: 2,
  },
  inputIcon: {
    flex: 1,
  },
  inputText: {
    flex: 5,
    height: '100%',
    fontSize: 18,
  },
  signInWrapper: {
    flex: 1,
    width,
    justifyContent: 'center',
    alignItems: 'center',
  },
  signIn: {
    width: componentWidth,
    height: componentHeight,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  signInText: {color: colors.contrast},
  errorMessage: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    color: 'red',
  },
};
