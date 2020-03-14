import "react-native";
import React from "react";
import RecentlyViewed from "./RecentlyViewed";
import renderer from "react-test-renderer";
import store from "../../store";

test("RecentlyViewed snapShot", () => {
  const snap = renderer.create(<RecentlyViewed store={store} />).toJSON();

  expect(snap).toMatchSnapshot();
});
