import axios from "axios";

const baseUrl = "http://localhost:3001/todos";

export const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

// default {getAll};
