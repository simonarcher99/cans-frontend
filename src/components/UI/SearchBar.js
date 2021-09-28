const SearchBar = (props) => {
  const searchHandler = (event) => {
    props.onSearchHandler(event.target.value);
  };

  return (
    <section>
      <form>
        <input onChange={searchHandler} placeholder="Search"></input>
      </form>
    </section>
  );
};

export default SearchBar;
