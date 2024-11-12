import React, {useState, useCallback} from 'react';


function SearchBar(props) {
  const { onSearch } = props;
  const [text, setText] = useState('');

  const handleTextChange = useCallback((event) => {
    setText(event.target.value);
  }, []);

  const search = useCallback(() => {
    onSearch(text);
  }, [onSearch, text]);


  return (
    <div className="SearchBar">
      <input placeholder="Enter A Song Title" onChange={handleTextChange} />
      <button className="SearchButton" onClick={search}>
        SEARCH
      </button>
    </div>
  );

}

export default SearchBar;