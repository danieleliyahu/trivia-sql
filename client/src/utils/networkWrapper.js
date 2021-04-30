import axios from "axios";
import { readCookie } from "./Cookies";

const getHttp = (url) => {
  return axios.get(url, {
    headers: {
      authorization: "Bearer " + readCookie("token"),
    },
  });
};

export { getHttp };
