import {Client} from "../Redux/testgen.ts";
import axios, {AxiosInstance} from "axios";

const apiPath = "http://localhost:7060"
export let client: Client = new Client(apiPath, axios.create())

export function setClient(axiosInstance: AxiosInstance) {
    client = new Client(apiPath, axiosInstance)
}
