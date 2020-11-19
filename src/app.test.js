
import * as axios from "axios";
import BaseUrl from './constants'
jest.mock("axios");

test("AdminAllClassrooms", () => {
  let apiEndpoint = BaseUrl + '/adminCampus/allClassrooms'
  axios.get.mockImplementation((apiEndpoint) => {
    Promise.resolve({ });
  } )
});

test("bad response", () => {
  axios.get.mockImplementation(() => Promise.reject({  }));
  // ...
});