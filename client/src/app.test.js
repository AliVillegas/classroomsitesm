
import * as axios from "axios";
import BaseUrl from './constants'
// Mock out all top level functions, such as get, put, delete and post:
jest.mock("axios");

// ...

test("AdminAllClassrooms", () => {
  let apiEndpoint = BaseUrl + '/adminCampus/allClassrooms'
  axios.get.mockImplementation((apiEndpoint) => {
    Promise.resolve({ });
  } )
  // ...
});

test("bad response", () => {
  axios.get.mockImplementation(() => Promise.reject({  }));
  // ...
});