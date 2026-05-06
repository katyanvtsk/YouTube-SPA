import { useSelector } from "react-redux";
import { selectVideo } from "./redux/slices/videoSlice";
import { selectInputText } from "./redux/slices/inputText";
import LoadingSpinner from "./LoadingSpiner.jsx";
import Search from "./Search.jsx";
import { selectView } from "./redux/slices/viewSlice";
import ToggleList from "./ToggleList.jsx";
import "./styles/videoList.css";
import "./styles/count.css";

const VideoList = () => {
  const { videos, loading, error, success, pageInfo } =
    useSelector(selectVideo);
  const view = useSelector(selectView);
  const text = useSelector(selectInputText);

  const getVideoId = (item) => {
    return item.id?.videoId || item?.id;
  };

  const getVideoTitle = (item) => {
    return item.snippet.title;
  };
  const getDescription = (item) => {
    return item.snippet?.description || "Описание отсутствует";
  };

  const getVideoImg = (video) => {
    return (
      video.snippet?.thumbnails?.medium?.url ||
      video?.snippet?.thumbnails?.default?.url ||
      "Изображение отсутствует"
    );
  };

  const getChannelTitle = (item) => {
    return item.snippet?.channelTitle || "Неизвестный канал";
  };

  const getDataPublished = (item) => {
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

  const getViewCount = (item) => {
    const count = item.statistics.viewCount || "0";
    const num = +count;
    if (num >= 1000) {
      return `${(num / 1000).toFixed(0)} тыс 👁️`;
    } else if (num >= 1000000) {
      return `${(num / 1000000).toFixed(0)} млн 👁️`;
    }
    return `${num} 👁️`;
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  if (error) {
    return (
      <div style={{ textAlign: "center", padding: "40px", color: "red" }}>
        ❌ Ошибка: {error}
      </div>
    );
  }

  if (success && videos.length === 0 && text) {
    return (
      <div>
        <p>Ничего не найдено по вашему запросу...</p>
      </div>
    );
  }

  return (
    <>
      <div>
        <Search />
      </div>
      {error && <p>{error}</p>}
      <div className="count">
        <div className="count__text">
          <p className="count__length">
            Найдено видео: {pageInfo.totalResults}
          </p>
        </div>

        <div>
          <ToggleList />
        </div>
      </div>

      <div className={view === "grid" ? "video-grid" : "video-list"}>
        {videos.map((item) => {
          const videoId = getVideoId(item);
          const videoTitle = getVideoTitle(item);
          const videoData = getDataPublished(item);
          const videoDescription = getDescription(item);
          const videoImg = getVideoImg(item);
          const videoChannelTitle = getChannelTitle(item);
          const videoViewCount = getViewCount(item);
          if (view == "grid") {
            return (
              <div key={videoId} className="video-card">
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-link"
                >
                  <img src={videoImg} alt={videoTitle} className="video-img" />
                </a>

                <div className="video-info">
                  <h3 className="video-title">{videoTitle}</h3>
                  <p className="channel-title">{videoChannelTitle}</p>
                  <p>{videoData}</p>
                  <p className="video-description">
                    {videoDescription.substring(0, 100)}...
                  </p>
                  <p className="video-view">{videoViewCount}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div key={videoId} className="video-list-item">
                <a
                  href={`https://www.youtube.com/watch?v=${videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-link"
                >
                  <img
                    src={videoImg}
                    alt={videoTitle}
                    className="video-list-img"
                  />
                </a>

                <div className="video-info video-info__list">
                  <h3 className="video-list-title">{videoTitle}</h3>
                  <p className="channel-list-title">{videoChannelTitle}</p>
                  <p className="video-list-description">{videoDescription}</p>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
};

export default VideoList;
