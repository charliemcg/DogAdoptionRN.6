import "react-native";
import React from "react";
import LeftButton from "./LeftButton";
import renderer from "react-test-renderer";
import store from "../../store";

test("LeftButton snapShot", () => {
  const snap = renderer.create(<LeftButton store={store} />).toJSON();

  expect(snap).toMatchSnapshot();
});
