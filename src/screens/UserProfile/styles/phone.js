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
    flexDirection: "row",
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
    marginTop: "5%",
    justifyContent: "space-around",
    alignItems: "center"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    width: "90%",
    height: "90%",
    backgroundColor: colors.primary,
    borderRadius: 5
  },
  signOutBtnWrapper: {
    height: 85,
    width,
    justifyContent: "center",
    alignItems: "center",
    paddingRight: "2%",
    paddingLeft: "2%"
  },
  signOutBtn: {
    width: "95%",
    height: "90%",
    backgroundColor: colors.primary,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 5
  },
  signOutContentsWrapper: {
    flexDirection: "row",
    width: "40%",
    justifyContent: "space-between",
    alignItems: "center"
  },
  btnText: {
    color: colors.contrast,
    fontSize: 20
  },
  recents: {
    marginLeft: "3%",
    fontSize: 17
  },
  resolutionWrapper: {
    width,
    height: 70,
    justifyContent: "center",
    alignItems: "center"
  }
};
