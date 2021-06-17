import Axios from "axios";
import { BASE_API_URL } from "../config/api";

export const httpClient = Axios.create({
  baseURL: BASE_API_URL,
});
