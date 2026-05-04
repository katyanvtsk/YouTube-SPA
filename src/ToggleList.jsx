import { useDispatch } from "react-redux";
import { setList, setGrid } from "./redux/slices/viewSlice";
import "./styles/count.css";

const ToggleList = () => {
  const dispatch = useDispatch();

  return (
    <div className="toggle">
      <button
        onClick={() => dispatch(setGrid("grid"))}
        className="toggle__button"
      >
        Сетка
      </button>

      <button
        onClick={() => dispatch(setList("list"))}
        className="toggle__button"
      >
        Список
      </button>
    </div>
  );
};

export default ToggleList;
