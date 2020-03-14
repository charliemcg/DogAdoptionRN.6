import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;
const componentWidth = width * 0.7;
const componentHeight = width * 0.15;

export default {
  parent: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center"
  },
  iconWrapper: {
    flex: 3,
    width,
    justifyContent: "center",
    alignItems: "center"
  },
  usernameWrapper: {
    flex: 1,
    width,
    justifyContent: "center",
    alignItems: "center"
  },
  passwordWrapper: {
    flex: 1,
    width,
    justifyContent: "center",
    alignItems: "center"
  },
  textInput: {
    width: componentWidth,
    height: componentHeight,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    borderBottomStyle: "solid",
    borderBottomColor: colors.primary,
    borderBottomWidth: 2
  },
  inputIcon: {
    flex: 1
  },
  inputText: {
    flex: 4
  },
  signInWrapper: {
    flex: 1,
    width,
    justifyContent: "center",
    alignItems: "center"
  },
  signIn: {
    width: componentWidth,
    height: componentHeight,
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center"
  },
  facebookWrapper: {
    flex: 1,
    width,
    justifyContent: "center",
    alignItems: "center"
  },
  facebook: {
    width: componentWidth,
    height: componentHeight,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center"
  },
  privacyWrapper: {
    flex: 2,
    width,
    justifyContent: "center",
    alignItems: "center"
  }
};
