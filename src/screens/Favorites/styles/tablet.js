import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginLeft: width * 0.02,
    marginRight: width * 0.02,
    marginTop: width * 0.01,
    marginBottom: width * 0.01
  },
  titleWrapper: {
    width,
    height: "10%",
    justifyContent: "center",
    paddingLeft: "7%"
  },
  title: {
    fontSize: 30,
    color: colors.fadedText
  },
  // favorites exist
  list: { width: "100%", height: "90%" },
  // favorites don't exist
  noFavoritesWrapper: { height: "90%", width, alignItems: "center" },
  noFavorites: {
    width: "100%",
    height: "70%",
    justifyContent: "center",
    alignItems: "center"
  },
  noFavoritesText: { fontSize: 25, color: colors.fadedText },
  recents: {
    height: "30%",
    width: "95%"
  }
};
