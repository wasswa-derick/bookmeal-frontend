const mockStorage = {};

const mockLocalStorage = {
  setItem: (key, val) => Object.assign(mockStorage, { [key]: val }),
  getItem: key => mockStorage[key],
  removeItem: key => mockStorage[key]
};

export default mockLocalStorage;
