import axios from "axios";
const API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const BASE_URL = "https://www.googleapis.com/youtube/v3";

const instance = axios.create({
  baseURL: BASE_URL,
  params: {
    key: API_KEY,
  },
});

export const getVideo = async (text, limit = 12, order = "") => {
  try {
    const response = await instance.get("/search", {
      params: {
        part: "snippet",
        maxResults: limit,
        q: text,
        order: order || undefined,
      },
    });
    return { videos: response.data.items, pageInfo: response.data.pageInfo }; //массив видео и информация об кол-ве
  } catch (error) {
    console.log(error.message);

    throw new Error("не удалось загрузить видео");
  }
};
