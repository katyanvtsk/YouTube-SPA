import { useDispatch, useSelector } from "react-redux";
import { selectInputText } from "./redux/slices/inputText";
import { change, clearInput } from "./redux/slices/inputText";
import { useEffect, useState } from "react";
import { searchVideo } from "./redux/slices/videoSlice";
import { useLocation, useNavigate } from "react-router";
import Modal from "./Modal";
import Form from "./Form";
import { selectVideo } from "./redux/slices/videoSlice";
import "./styles/search.css";

const Search = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [textError, setTextError] = useState(false);
  const text = useSelector(selectInputText);
  const [isModal, setModal] = useState(false);
  const { success, searchText } = useSelector(selectVideo);

  const handleChange = (e) => {
    const value = e.target.value;
    dispatch(change(value));
  };

  useEffect(() => {
    if (searchText && searchText !== text) {
      dispatch(change(searchText));
    }
  }, [searchText]);

  useEffect(() => {
    if (location.pathname === "/") {
      dispatch(clearInput());
    }
  }, [location.pathname]);

  const handleClick = () => {
    if (!text.trim()) {
      setTextError(true);
      return;
    }
    dispatch(
      searchVideo({
        text: text.trim(),
        limit: 12,
        order: "",
      }),
    );
    navigate("/video");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleClick();
    }
  };

  const handleSave = () => {
    if (!text.trim()) {
      setTextError(true);
      return;
    }
    setModal(true);
  };

  return (
    <>
      <h1 className="title">Поиск видео</h1>
      <div className="search">
        <div className="search__input">
          <input
            type="text"
            value={text}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            placeholder="Введите запрос..."
          />
          {success && (
            <button
              onClick={handleSave}
              className="search__button search__button-save"
            >
              ♡
            </button>
          )}
        </div>
        <button
          onClick={handleClick}
          className="search__button search__button-search"
        >
          Найти
        </button>
      </div>
      {textError && <p className="error">Введите поисковой запрос!</p>}
      {isModal && (
        <Modal isModal={isModal}>
          <Form onClose={() => setModal(false)} />
        </Modal>
      )}
    </>
  );
};

export default Search;
