import "react-native";
import React from "react";
import SignIn from "./SignIn";
import renderer from "react-test-renderer";
import store from "../../store";

test("SignIn snapShot", () => {
  const snap = renderer.create(<SignIn store={store} />).toJSON();

  expect(snap).toMatchSnapshot();
});
