import axios from "../axios";

export const getRoleListRequest = async () => axios.get("/role");
