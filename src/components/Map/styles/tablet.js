import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    height: width * 0.6,
    width,
    justifyContent: "center",
    alignItems: "center"
  },
  mapContainer: {
    //4 x 3 aspect ratio
    height: width * 0.55,
    width: width * 0.55 * 1.333,
    backgroundColor: colors.black,
    justifyContent: "center",
    alignItems: "center",
    borderColor: colors.fadedText,
    borderWidth: 1,
    borderStyle: "solid"
  },
  touchable: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  placeholderImg: {
    height: "100%",
    width: "100%"
  },
  textWrapper: {
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  text: {
    color: colors.white,
    fontSize: 20
  },
  mapImg: {
    height: "100%",
    width: "100%"
  },
  map: {
    height: "100%",
    width: "100%"
  }
};
