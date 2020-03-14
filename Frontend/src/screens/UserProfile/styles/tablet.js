import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    flex: 1,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center"
  },
  iconWrapper: {
    height: 165,
    width,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10
  },
  details: {
    height: 90,
    width,
    justifyContent: "center",
    alignItems: "center"
  },
  scrollView: {
    height: "100%",
    width
  },
  gridRow: {
    height: width * 0.4,
    width,
    paddingRight: "2%",
    paddingLeft: "2%"
  },
  buttonWrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  btnContentsWrapper: {
    height: "90%",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row-reverse"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "70%",
    height: "70%",
    backgroundColor: colors.primary,
    borderRadius: 5
  },
  signOutBtnWrapper: {
    height: width * 0.2,
    width,
    paddingRight: "2%",
    paddingLeft: "2%",
    justifyContent: "center",
    alignItems: "center"
  },
  signOutBtn: {
    width: "70%",
    height: "70%",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  signOutContentsWrapper: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    paddingLeft: "3%"
  },
  btnText: {
    color: colors.contrast,
    fontSize: 20
  },
  signOutIcon: {
    marginLeft: "10%"
  },
  recents: {
    marginLeft: "3%",
    width: "94%"
  },
  resolutionWrapper: {
    width,
    height: 70,
    justifyContent: "center",
    alignItems: "center"
  }
};
