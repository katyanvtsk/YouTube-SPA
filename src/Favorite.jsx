import { useState } from "react";
import Form from "./Form";
import { deleteSearch } from "./redux/slices/savedSlice";
import { useDispatch } from "react-redux";
import { searchVideo } from "./redux/slices/videoSlice";
import { useNavigate } from "react-router";
import "./styles/favorite.css";

const Favorite = ({ searchData }) => {
  // searchData {id:, search: "", name: "", order: "", limit: }
  const [isEdit, setEdit] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleGetVideo = () => {
    dispatch(
      searchVideo({
        text: searchData.search,
        limit: searchData.limit,
        order: searchData.order,
      }),
    );
    navigate("/video");
  };

  if (isEdit) {
    return <Form onClose={() => setEdit(false)} editData={searchData} />;
  }

  return (
    <div className="favorite">
      <p className="favorite__text">{searchData.name}</p>
      <div className="favorite__buttons buttons">
        <button onClick={handleGetVideo} className="buttons__done">
          🔄
        </button>
        <button
          onClick={() => {
            setEdit(true);
          }}
          className="buttons__edit"
        >
          ✏️
        </button>
        <button
          onClick={() => dispatch(deleteSearch(searchData.id))}
          className="buttons__delete"
        >
          🗑️
        </button>
      </div>
    </div>
  );
};

export default Favorite;
