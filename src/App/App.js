import React, {useState, useCallback} from 'react';
import './App.css';

import Spotify from '../App/Utility/Spotify.js';
import SearchResults from '../App/searchResults/searchResults.js';
import Playlist from '../App/playlist/playlist.js';
import SearchBar from '../App/searchBar/searchBar.js';


function App() {

  const [searchResults, setSearchResults] = useState([]);
  const [playlistName, setPlaylistName] = useState('New Playlist');
  const [playlistTracks, setPlaylistTracks] = useState([]);

  const search = useCallback((text) => {
    Spotify.search(text).then(setSearchResults);
  }, []);

  const addTrack = useCallback((track) => {
    if (playlistTracks.some((savedTrack) => savedTrack.id === track.id))
      return;
    setPlaylistTracks((prevTracks) => [...prevTracks, track]);
  }, [playlistTracks]);

  const removeTrack = useCallback((track) => {
    setPlaylistTracks((prevTracks) => prevTracks.filter((currentTrack) => currentTrack.id !== track.id)
    );
  }, []);

  const updatePlaylistName = useCallback((name) => {
    
    setPlaylistName(name);
  }, []);

  const savePlaylist = useCallback(() => {
    if (playlistName.length === 0) {
      alert('please name your playlist before saving.')
      return;
    }
    if (playlistTracks.length === 0) {
      alert('Please add a song before saving the playlist.')
      return;
    }
    const trackUris = playlistTracks.map((track) => track.uri);
    Spotify.savePlaylist(playlistName, trackUris).then(() => {
      setPlaylistName('New Playlist');
      setPlaylistTracks([]);
    });
  }, [playlistName, playlistTracks]);



  return (
    <div className="Container">
      <h1>
        Ja<span className='highlight'>mmm</span>ing
      </h1>
      <div className='App'>
        <SearchBar onSearch={search} />
        <div className='App-playlist'>
          <SearchResults searchResults={searchResults} onAdd={addTrack} />
          <Playlist
            playlistName={playlistName}
            playlistTracks={playlistTracks}
            onNameChange={updatePlaylistName}
            onRemove={removeTrack}
            onSave={savePlaylist} />
        </div>
      </div>
    </div>
  );
}

export default App;
