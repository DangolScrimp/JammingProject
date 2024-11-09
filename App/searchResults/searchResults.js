import React from 'react';

import './searchResults.css';

import TrackList from '../tracklist/tracklist';

const SearchResults = ({searchResults, onAdd}) => {
  return (
    <div className='SearchResults'>
        <h2>Results</h2>
        <TrackList tracks={searchResults} onAdd={onAdd} isRemoval={false} />
    </div>
  );
};

export default SearchResults;