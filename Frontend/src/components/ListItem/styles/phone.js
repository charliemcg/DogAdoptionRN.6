import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    height: width * 0.9875,
    width,
    backgroundColor: colors.notQuiteWhite,
    alignItems: "center"
  },
  touchable: {
    width: "100%",
    height: "100%"
  },
  contentWrapper: {
    width: "100%",
    height: "100%",
    alignItems: "center"
  },
  // photo
  imageWrapper: {
    // 4 x 3 aspect ratio
    width: width * 0.85,
    height: width * 0.6375
  },
  image: {
    position: "absolute",
    height: "100%",
    width: "100%",
    flex: 1
  },
  blurredImage: {
    flex: 1
  },
  animatable: {
    height: width * 0.1,
    width: width * 0.1,
    position: "absolute",
    top: "5%",
    right: "3%"
  },
  favorite: {
    height: "100%",
    width: "100%"
  },
  heart: {
    height: "100%",
    width: "100%"
  },
  detailsWrapper: {
    height: "100%",
    weight: "100%",
    alignItems: "center"
  },
  // quick details
  quickDetailsRow: {
    height: "5%",
    width,
    flexDirection: "row",
    alignItems: "center"
  },
  breed: {
    paddingLeft: "10%"
  },
  location: {
    flex: 1,
    paddingLeft: "10%"
  },
  price: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    paddingRight: "10%"
  },
  date: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    paddingRight: "10%"
  },
  coloredPrice: {
    color: colors.dark,
    fontWeight: "bold"
  },
  // description
  description: {
    height: "25%",
    width: width * 0.85
  },
  fade: {
    top: "10%",
    width,
    height: "25%",
    position: "absolute"
  }
};
