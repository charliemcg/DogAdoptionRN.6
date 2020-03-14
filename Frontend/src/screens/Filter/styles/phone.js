import colors from "../../../colors";
import { Dimensions } from "react-native";

const width = Dimensions.get("window").width;

export default {
  parent: {
    flex: 1,
    backgroundColor: colors.notQuiteWhite,
    justifyContent: "space-around",
    alignItems: "center",
    paddingTop: "10%"
  },
  optionWrapper: {
    flexDirection: "row",
    width: width * 0.85,
    height: width * 0.3
  },
  optionWrapperLeft: {
    flex: 3,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    marginRight: 10,
    borderTopLeftRadius: 20,
    borderBottomLeftRadius: 20
  },
  optionWrapperRight: {
    flex: 7,
    alignItems: "flex-end",
    backgroundColor: colors.white,
    borderBottomRightRadius: 8,
    borderTopRightRadius: 8
  },
  iconWrapper: {
    flex: 2,
    justifyContent: "center"
  },
  textWrapper: {
    flex: 1,
    paddingLeft: "10%",
    paddingTop: "4%"
  },
  nameText: {
    fontSize: 20,
    color: colors.fadedText
  },
  topRightWrapper: {
    flex: 2,
    flexDirection: "row"
  },
  //breed
  modalSelectorWrapper: {
    flex: 2,
    width: "100%",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingBottom: 5
  },
  modalSelector: {
    width: "95%"
  },
  //location
  statesWrapper: {
    flex: 2,
    justifyContent: "space-around",
    width: "100%"
  },
  expandedStatesWrapper: {
    borderColor: colors.notQuiteBlack,
    borderStyle: "solid",
    borderWidth: 1,
    marginRight: 20,
    backgroundColor: colors.white
  },
  statesRow: {
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-around"
  },
  state: {
    width: "20%",
    textAlign: "center"
  },
  selectedState: {
    backgroundColor: colors.primary,
    width: "20%",
    borderRadius: 10
  },
  //price
  priceWrapper: {
    flexDirection: "row",
    flex: 3,
    alignItems: "flex-end",
    paddingBottom: "3%"
  },
  minPriceWrapper: { flex: 1, paddingLeft: 5 },
  maxPriceWrapper: { flex: 1, paddingRight: 5 },
  priceSelectorWrapper: { alignItems: "center" },
  priceSelector: { width: "90%" },
  priceText: { color: colors.fadedText, paddingLeft: "8%" },
  //matches
  matchesCountWrapper: {
    flexDirection: "row"
  },
  matchesLabels: {
    padding: "3%"
  },
  matchesValues: {
    padding: "3%"
  },
  activityIndicator: {
    marginTop: 7
  },
  //update button
  updateBtn: {
    backgroundColor: colors.primary,
    width: width * 0.7,
    height: width * 0.2,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10
  },
  btnText: {
    fontSize: 20,
    color: colors.contrast
  }
};
