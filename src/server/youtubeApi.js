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
    const searchVideo = await instance.get("/search", {
      params: {
        part: "snippet",
        maxResults: limit,
        q: text,
        order: order || undefined,
      },
    });
    const videosId = searchVideo.data.items
      .map((item) => item.id.videoId)
      .join(","); // 'id1, id2, id3'

    const result = await instance.get("/videos", {
      params: {
        part: "snippet,statistics",
        id: videosId,
      },
    });
    console.log(result.data.items);

    return { videos: result.data.items, pageInfo: result.data.pageInfo }; //массив видео и информация об кол-ве
  } catch (error) {
    console.log(error.message);

    throw new Error("не удалось загрузить видео");
  }
};
