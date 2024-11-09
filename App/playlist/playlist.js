import React, {useCallback} from 'react';
import './playlist.css';
import TrackList from '../tracklist/tracklist';

const Playlist = (props) => {
  const {onNameChange, playlistTracks, onRemove, onPlay, currentTrackId, onSave} = props;
  
  const handleNameChange = useCallback((event) => {
    onNameChange(event.target.value);
  }, [onNameChange]
);

    return (
      <div className='Playlist'>
        <input onChange={handleNameChange} placeholder='Create playlist...' />
        <TrackList 
          tracks={playlistTracks}
          isRemoval={true}
          onRemove={onRemove}
          onPlay={onPlay}
          currentTrackId={currentTrackId}
        />
        <button className='Playlist-save' onClick={onSave}>Save to Spotify</button>
      </div>
      
    );
      
};


export default Playlist;