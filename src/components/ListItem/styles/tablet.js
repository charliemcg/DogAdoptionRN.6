import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    height: width * 0.4875,
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
    flexDirection: "row"
  },
  detailsWrapper: {
    alignItems: "center",
    marginTop: "2%"
  },
  // photo
  imageWrapper: {
    // 4 x 3 aspect ratio
    width: width * 0.65,
    height: width * 0.4875,
    marginTop: "2%",
    marginBottom: "2%",
    marginLeft: "2%"
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
    height: width * 0.05,
    width: width * 0.05,
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
  // quick details
  quickDetailsRow: {
    height: "10%",
    width: width * 0.35,
    flexDirection: "row",
    alignItems: "center",
    marginTop: "2%"
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
    paddingTop: "2%",
    height: width * 0.6,
    width: width * 0.3
  },
  fade: {
    right: 0,
    height: "100%",
    width: width * 0.35,
    position: "absolute"
  }
};
