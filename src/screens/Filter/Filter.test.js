import "react-native";
import React from "react";
import Filter from "./Filter";
import renderer from "react-test-renderer";
import store from "../../store";

test("Filter snapshot", () => {
  const snapshot = renderer
    .create(<Filter store={store} searchResults={jest.fn()} />)
    .toJSON();

  expect(snapshot).toMatchSnapshot();
});
