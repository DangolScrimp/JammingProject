import React, {useState, useCallback} from 'react';


const searchBar = (props) => {
  const {onSearch} = props;
  const [text, setText] = useState('')

  const handleTextChange = useCallback((event) => {
    setText(event.target.value);
  },[]);

  const search = useCallback(() => {
    onSearch(text);
  },[onSearch, text]);


    return (
    <div className="SearchBar">
      <input placeholder="Enter A Song Title" onChange={handleTermChange} />
      <button className="SearchButton" onClick={search}>
        SEARCH
      </button>
    </div>
    );
      
}

export default searchBar;