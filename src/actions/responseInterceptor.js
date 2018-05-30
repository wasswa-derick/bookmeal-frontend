import axios from "axios";
import { gotMessage } from "./message";

/**
 *
 * @returns {null} intercepts http responses
 * @export
 * @param {any} store
 */
export default function(store) {
  axios.interceptors.response.use(
    response => response,
    error => {
      // Handle 505 errors and 401 errors
      if (error.response.status) {
        switch (error.response.status) {
          case 401:
            localStorage.removeItem("authUserToken");
            store.dispatch(
              gotMessage({
                text: "Session has expired log out and login again.",
                type: "danger"
              })
            );
            break;
          case 500:
            store.dispatch(
              gotMessage({
                text: "Internal server error occurred",
                type: "danger"
              })
            );
            break;
          case 403:
            store.dispatch(
              gotMessage({
                text: "Cannot fetch resource, access forbidden",
                type: "danger"
              })
            );
            break;
          case 404:
            store.dispatch(
              gotMessage({
                text: "Requested resource not found",
                type: "info"
              })
            );
            break;
          default:
            break;
        }
      }
      return Promise.reject(error);
    }
  );
}
