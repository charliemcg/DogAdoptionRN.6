import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    height: width * 0.75,
    width,
    justifyContent: "center",
    alignItems: "center"
  },
  mapContainer: {
    height: "90%",
    width: "90%",
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
