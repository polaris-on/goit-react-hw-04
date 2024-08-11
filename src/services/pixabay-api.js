import axios from "axios";

export const fetchImg = async (query = "red", page = 0, perPage = 5) => {
  const response = await axios.get(`https://api.unsplash.com/search/photos/`, {
    params: {
      query,
      per_page: perPage,
      page,
      client_id: "qwjji_tx8kxAYhAG0s8ERIFmJE4L2s7QN2MRz5hLyAg",
    },
  });
  return response.data;
};
