import classes from "./SearchBar.module.css";

const SearchBar = (props) => {
  const searchHandler = (event) => {
    props.onSearchHandler(event.target.value);
  };

  return (
    <section>
      <form>
        <input
          className={classes["search-bar"]}
          onChange={searchHandler}
          placeholder="Search"
        ></input>
      </form>
    </section>
  );
};

export default SearchBar;
