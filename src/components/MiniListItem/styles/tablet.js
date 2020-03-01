import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    //getting the optimal width for looking good on th eFavorites page
    width: (width * 0.96) / 3,
    height: (width * 0.96) / 3,
    alignItems: "center",
    paddingTop: width * 0.03
  },
  touchable: {
    width: width * 0.3,
    //height of photo plus height of breed label
    height: width * 0.3 * 0.75 + width * 0.05,
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5
  },
  imageWrapper: {
    //4 x 3 aspect ratio
    width: "100%",
    height: width * 0.3 * 0.75
  },
  image: {
    position: "absolute",
    height: "100%",
    width: "100%"
  },
  blurredImage: {
    height: "100%",
    width: "100%"
  },
  favorite: {
    height: width * 0.05,
    width: width * 0.05,
    position: "absolute",
    top: "5%",
    right: "3%"
  },
  heart: {
    height: "100%",
    width: "100%"
  },
  breed: {
    height: width * 0.05,
    width: width * 0.3,
    justifyContent: "center",
    paddingLeft: "5%",
    borderBottomLeftRadius: 5,
    borderBottomRightRadius: 5,
    backgroundColor: "#ddd"
  },
  price: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    bottom: 3,
    left: 3,
    backgroundColor: colors.notQuiteWhite,
    height: "20%",
    width: "40%",
    borderRadius: 10
  },
  coloredPrice: {
    color: colors.dark,
    fontWeight: "bold"
  }
};
