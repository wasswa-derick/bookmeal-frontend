/* eslint-disable */
import jwt from "jsonwebtoken";

describe("index app entry point", () => {
  beforeEach(() => {
    localStorage.setItem(
      "authUserToken",
      jwt.sign({ email: "test@test.com", name: "test" }, "secret")
    );
  });

  it("renders without crashing", () => {
    const root = document.createElement("div");
    root.setAttribute("id", "root");
    document.body.appendChild(root);
    require("./index");
  });
});
