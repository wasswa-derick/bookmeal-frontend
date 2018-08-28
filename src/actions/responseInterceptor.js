import instance from "./axiosInstance";
import { gotMessage } from "./message";

/**
 *
 * @returns {null} intercepts http responses
 * @export
 * @param {any} store
 */
export default function(store) {
  instance.interceptors.response.use(
    response => response,
    error => {
      // Handle 505 errors and 401 errors
      if (error.response.status) {
        switch (error.response.status) {
          case 401:
            if (localStorage.getItem("authUserToken")) {
              localStorage.removeItem("authUserToken");
              store.dispatch(
                gotMessage({
                  text: "Session has expired log out and login again.",
                  show: true
                })
              );
              window.location.reload();
            }

            break;
          case 500:
            store.dispatch(
              gotMessage({
                text: "Internal server error occurred",
                show: true
              })
            );
            break;
          case 403:
            store.dispatch(
              gotMessage({
                text: "Cannot fetch resource, access forbidden",
                show: true
              })
            );
            break;
          case 404:
            store.dispatch(
              gotMessage({
                text: "Requested resource not found",
                show: true
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
