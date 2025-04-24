
import { useId } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setNameFilter } from "../../redux/filtersSlice";
import styles from "./SearchBox.module.css";

const SearchBox = () => {
  const searchId = useId();
  const dispatch = useDispatch();
  const value = useSelector(state => state.filters.name);

  const handleChange = (e) => {
    dispatch(setNameFilter(e.target.value));
  };

  return (
    <div className={styles["search-box"]}>
      <label className={styles["search-label"]} htmlFor={searchId}>
        Find contacts by name
      </label>
      <input
        onChange={handleChange}
        className={styles["search-field"]}
        id={searchId}
        type="search"
        inputMode="search"
        value={value}
      />
    </div>
  );
};

export default SearchBox;
