import "react-native";
import React from "react";
import Map from "./Map";
import renderer from "react-test-renderer";

test("Map snapShot", () => {
  const snap = renderer.create(<Map location={"QLD"} />).toJSON();

  expect(snap).toMatchSnapshot();
});
