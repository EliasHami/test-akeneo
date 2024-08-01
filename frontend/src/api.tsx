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
