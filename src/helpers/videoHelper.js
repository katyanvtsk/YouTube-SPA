export const getVideoId = (item) => {
  return item.id?.videoId || item?.id;
};

export const getVideoTitle = (item) => {
  return item.snippet.title;
};

export const getDescription = (item) => {
  return item.snippet?.description || "Описание отсутствует";
};

export const getVideoImg = (video) => {
  return (
    video.snippet?.thumbnails?.medium?.url ||
    video?.snippet?.thumbnails?.default?.url ||
    "Изображение отсутствует"
  );
};

export const getChannelTitle = (item) => {
  return item.snippet?.channelTitle || "Неизвестный канал";
};

export const getDataPublished = (item) => {
  const date = new Date(item.snippet?.publishedAt);
  const now = new Date();
  const diff = now - date; // разница в мс
  const minutes = Math.floor(diff / (1000 * 60));
  const hours = Math.floor(diff / (1000 * 60 * 60));
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));

  if (minutes < 1) return "только что";
  if (minutes < 60) return `${minutes} мин назад`;
  if (hours < 24) return `${hours} ч назад`;
  if (days < 7) return `${days} дн назад`;
  if (days < 30) return `${Math.floor(days / 7)} нед назад`;
  if (days < 365) return `${Math.floor(days / 30)} мес назад`;
  return `${Math.floor(days / 365)} г назад`;
};

export const getViewCount = (item) => {
  const count = item.statistics.viewCount || "0";
  const num = +count;
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(0)} млн 👁️`;
  } else if (num >= 1000) {
    return `${(num / 1000).toFixed(0)} тыс 👁️`;
  }
  return `${num} 👁️`;
};

export const videoMap = (item) => {
  return {
    videoId: getVideoId(item),
    videoTitle: getVideoTitle(item),
    videoData: getDataPublished(item),
    videoDescription: getDescription(item),
    videoImg: getVideoImg(item),
    videoChannelTitle: getChannelTitle(item),
    videoViewCount: getViewCount(item),
  };
};
