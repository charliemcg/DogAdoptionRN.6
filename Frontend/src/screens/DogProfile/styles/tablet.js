import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    flex: 1,
    alignItems: "center"
  },
  // photo
  imageWrapper: {
    width,
    height: width * 0.75
  },
  image: {
    position: "absolute"
  },
  blurredImage: {
    flex: 1
  },
  animatable: {
    height: width * 0.05,
    width: width * 0.05,
    position: "absolute",
    top: "2%",
    right: "3%"
  },
  // quick details
  quickDetailsRow: {
    width,
    height: "3%",
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center"
  },
  location: {
    flex: 1,
    paddingLeft: "20%",
    fontSize: 20
  },
  price: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    paddingRight: "20%"
  },
  priceText: { fontSize: 20 },
  coloredPrice: {
    color: colors.dark,
    fontWeight: "bold",
    fontSize: 20
  },
  breed: {
    paddingLeft: "20%",
    fontSize: 20
  },
  date: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    textAlign: "right",
    paddingRight: "20%",
    fontSize: 20
  },
  //scroll view
  scrollView: {
    backgroundColor: colors.notQuiteWhite,
    flex: 1
  },
  // seller details
  sellerWrapper: {
    flexDirection: "row",
    margin: width * 0.03,
    justifyContent: "flex-end",
    marginRight: width * 0.05
  },
  sellerText: {
    marginRight: width * 0.03
  },
  seller: {
    color: colors.dark,
    textAlign: "right"
  },
  // description
  description: {
    paddingLeft: width * 0.05,
    paddingRight: width * 0.05
  },
  //contact
  messageWrapper: {
    backgroundColor: colors.white,
    height: width * 0.4,
    width: width * 0.75,
    marginLeft: width * 0.125,
    marginBottom: width * 0.02,
    borderColor: "#aaa",
    borderStyle: "solid",
    borderWidth: 1,
    borderRadius: 10
  },
  contactTextWrapper: {
    justifyContent: "center",
    width: "100%",
    paddingLeft: "3%",
    paddingTop: "1%"
  },
  contactText: {
    fontSize: 25
  },
  message: {
    flex: 1,
    padding: "3%"
  },
  btnWrapper: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flexDirection: "row"
  },
  counter: {
    margin: 10,
    color: colors.fadedText
  },
  sendAnimatable: {
    width: width * 0.2,
    height: width * 0.0666,
    justifyContent: "center",
    alignItems: "center",
    margin: 10,
    borderRadius: 5
  },
  //recents
  recents: {
    marginLeft: "3%",
    width: "94%"
  },
  //fullscreen image
  fullScreenWrapper: {
    position: "absolute",
    backgroundColor: colors.black,
    zIndex: 1
  },
  fullScreenClose: {
    position: "absolute",
    zIndex: 2,
    top: 5,
    right: 5,
    backgroundColor: "rgba(255, 255, 255, 0.3)"
  },
  //generic style for filling a view
  fillView: {
    height: "100%",
    width: "100%",
    justifyContent: "center",
    alignItems: "center"
  }
};
