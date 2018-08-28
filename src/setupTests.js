/* eslint-disable */

import { configure } from "enzyme";
import Adapter from "enzyme-adapter-react-16";

configure({
  adapter: new Adapter()
});
const mockStorage = {};

const mockLocalStorage = {
  setItem: (key, val) => Object.assign(mockStorage, { [key]: val }),
  getItem: key => mockStorage[key],
  removeItem: key => mockStorage[key]
};

global.localStorage = mockLocalStorage;
global.sessionStorage = mockLocalStorage;
