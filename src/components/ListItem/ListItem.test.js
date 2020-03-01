import "react-native";
import React from "react";
import ListItem from "./ListItem";
import renderer from "react-test-renderer";
import store from "../../store";

test("ListItem snapShot", () => {
  const snap = renderer
    .create(<ListItem store={store} item={jest.fn()} />)
    .toJSON();

  expect(snap).toMatchSnapshot();
});
