import { BASE_URL } from "../constants/api.constants";
import { Client } from "./client";

export const builder = new Client({ url: BASE_URL });
