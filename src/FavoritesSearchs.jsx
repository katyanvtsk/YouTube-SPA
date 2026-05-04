import { useSelector } from "react-redux";

import { selectSavedSearch } from "./redux/slices/savedSlice";
import Favorite from "./Favorite";
import "./styles/favorite.css";

const FavoritesSearchs = () => {
  const savedSearch = useSelector(selectSavedSearch); //массив

  return (
    <div className="favorit-list">
      <h2 className="favorit-list__title">Избранные запросы</h2>
      {savedSearch.length === 0 ? (
        <h2 className="favorit-list__title">Сохранённых запросов нет!</h2>
      ) : (
        <div className="favorit-list__items">
          {savedSearch.map((item) => (
            <Favorite key={item.id} searchData={item} />
          ))}
        </div>
      )}
    </div>
  );
};

export default FavoritesSearchs;
