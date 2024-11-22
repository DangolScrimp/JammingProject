import React, {useState, useCallback} from 'react';
import '../searchBar/searchBar.css';


function SearchBar(props) {
  const { onSearch } = props;
  const [text, setText] = useState('');

  const handleTextChange = useCallback((event) => {
    setText(event.target.value);
  }, []);

  const search = useCallback((event) => {
    event.preventDefault();
    onSearch(text);
  }, [onSearch, text]);


  return (
    <div className="SearchBar">
      <form onSubmit={search} classname="form">
        <input placeholder="Enter A Song Title" onChange={handleTextChange} type='text'/>
        <button className="SearchButton" type='submit'>
          SEARCH
        </button>
      </form>
    </div>
  );

}

export default SearchBar;