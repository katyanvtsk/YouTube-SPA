import { useSelector } from "react-redux";
import { selectVideo } from "../redux/slices/videoSlice.js";
import { selectInputText } from "../redux/slices/inputText.js";
import LoadingSpinner from "../components/LoadingSpiner.jsx";
import Search from "../components/Search.jsx";
import { selectView } from "../redux/slices/viewSlice.js";
import ToggleList from "../components/ToggleList.jsx";
import { videoMap } from "../helpers/videoHelper.js";
import "../styles/videoList.css";
import "../styles/count.css";

const VideoList = () => {
  const { videos, loading, error, success, pageInfo } =
    useSelector(selectVideo);
  const view = useSelector(selectView);
  const text = useSelector(selectInputText);

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
          const video = videoMap(item);
          if (view == "grid") {
            return (
              <div key={video.videoId} className="video-card">
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-link"
                >
                  <img
                    src={video.videoImg}
                    alt={video.videoTitle}
                    className="video-img"
                  />
                </a>

                <div className="video-info">
                  <h3 className="video-title">{video.videoTitle}</h3>
                  <p className="channel-title">{video.videoChannelTitle}</p>
                  <p>{video.videoData}</p>
                  <p className="video-description">
                    {video.videoDescription.substring(0, 100)}...
                  </p>
                  <p className="video-view">{video.videoViewCount}</p>
                </div>
              </div>
            );
          } else {
            return (
              <div key={video.videoId} className="video-list-item">
                <a
                  href={`https://www.youtube.com/watch?v=${video.videoId}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="video-link"
                >
                  <img
                    src={video.videoImg}
                    alt={video.videoTitle}
                    className="video-list-img"
                  />
                </a>

                <div className="video-info video-info__list">
                  <h3 className="video-list-title">{video.videoTitle}</h3>
                  <p className="channel-list-title">
                    {video.videoChannelTitle}
                  </p>
                  <p className="video-list-description">
                    {video.videoDescription}
                  </p>
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
