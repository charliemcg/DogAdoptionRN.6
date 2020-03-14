import "react-native";
import React from "react";
import MiniListItem from "./MiniListItem";
import renderer from "react-test-renderer";
import store from "../../store";

test("MiniListItem snapShot", () => {
  const snap = renderer
    .create(<MiniListItem store={store} item={jest.fn()} />)
    .toJSON();

  expect(snap).toMatchSnapshot();
});
