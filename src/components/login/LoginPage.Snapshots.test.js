import React from "react";
import LoginPage from "./LoginPage";
import renderer from "react-test-renderer";

it("test login page", () => {
  const tree = renderer.create(<LoginPage />);
  expect(tree).toMatchSnapshot();
});
