import React, {useState, useCallback, useEffect} from 'react';
import '../searchBar/searchBar.css';


function SearchBar(props) {
  const { onSearch } = props;
  const [text, setText] = useState('');

  useEffect(() => {
    const savedText = localStorage.getItem('searchText');
    if (savedText) {
      setText(savedText);
    }
  }, []);

  const handleTextChange = useCallback((event) => {
    setText(event.target.value);
  }, []);

  const search = useCallback((event) => {
    event.preventDefault();
    localStorage.setItem('searchText', text);
    onSearch(text);
  }, [onSearch, text]); 


  return (
    <div className="SearchBar">
      <form onSubmit={search} classname="form">
        <input placeholder="Enter A Song Title" onChange={handleTextChange} type='text'/>
        <button className="SearchButton" type='submit' onclick={search}>
          SEARCH
        </button>
      </form>
    </div>
  );

}

export default SearchBar;