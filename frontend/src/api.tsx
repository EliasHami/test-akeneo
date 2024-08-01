import axios from "axios";

const axiosInstance = axios.create({
  baseURL: `http://localhost:8000/`,
});

export const getParticipants = async () => {
  try {
    const response = await axiosInstance.get("/participants");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const addParticipant = async (payload: {
  name: string;
  gift: string;
  blacklist: number[];
}) => {
  try {
    const response = await axiosInstance.post("/participant", payload);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const start_draw = async () => {
  try {
    const response = await axiosInstance.post("/draw/start");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const get_last_five_draws = async () => {
  try {
    const response = await axiosInstance.get("/draws/last_five");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
