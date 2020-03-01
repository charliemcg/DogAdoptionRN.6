import colors from "../../../colors";
import { Dimensions } from "react-native";
import Device from "react-native-device-detection";

const width = Dimensions.get("window").width;

export default {
  parent: {
    flex: 1,
    backgroundColor: colors.notQuiteWhite,
    justifyContent: "center",
    alignItems: "center"
  },
  //fab
  fab: {
    height: width * 0.08,
    width: "40%",
    flexDirection: "row",
    position: "absolute",
    backgroundColor: colors.primary,
    bottom: Device.isIphoneX ? "6%" : "3%",
    borderRadius: width * 0.04
  },
  fabTouchableWrapper: {
    height: "100%"
  },
  fabButton: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  filterTouchable: {
    width: width * 0.2,
    height: width * 0.08,
    borderTopLeftRadius: width * 0.04,
    borderBottomLeftRadius: width * 0.04
  },
  sortTouchable: {
    width: width * 0.2,
    height: width * 0.08,
    borderTopRightRadius: width * 0.04,
    borderBottomRightRadius: width * 0.04
  },
  dividerWrapper: {
    height: width * 0.08,
    justifyContent: "center"
  },
  divider: {
    width: 1,
    height: width * 0.06,
    backgroundColor: colors.dark
  },
  fabIconWrapper: {
    width: "33%",
    height: width * 0.08,
    justifyContent: "center",
    alignItems: "flex-end"
  },
  fabTextWrapper: {
    width: "66%",
    height: width * 0.08,
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: colors.contrast
  },
  //error screen
  retryWrapper: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  errorTextWrapper: {
    flex: 1,
    color: colors.fadedText,
    width,
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: "5%"
  },
  errText: {
    color: colors.fadedText,
    fontSize: 18
  },
  retryBtnWrapper: {
    alignItems: "center",
    flex: 1,
    width
  },
  errTouchable: { borderRadius: 10 },
  retryTextWrapper: {
    paddingLeft: "10%",
    paddingRight: "5%",
    justifyContent: "space-around",
    alignItems: "center",
    height: width * 0.12,
    width: width * 0.32,
    flexDirection: "row",
    borderRadius: 10,
    backgroundColor: colors.primary
  },
  retryText: { color: colors.contrast, fontSize: 17 }
};
