import React, {useState, useCallback, useEffect} from 'react';

import './track.css';


let currentlyPlayingAudio = null;
let currentlyPlayingTrack = null;

function Track(props) {
  const { track, onAdd, onRemove, isRemoval } = props;
  const [isPlaying, setIsPlaying] = useState(false);
  const [audio] = useState(track.previewUrl ? new Audio(track.previewUrl) : null);
  const [errorMessage, setErrorMessage] = useState('');

  const addTrack = useCallback(() => {
    onAdd(track);
  }, [onAdd, track]);

  const removeTrack = useCallback(() => {
    onRemove(track);
  }, [onRemove, track]);

  const renderAction = () => {
    if (isRemoval) {
      return (
        <button onClick={removeTrack}>
          -
        </button>
      );
    }
    return (
      <button onClick={addTrack}>
        +
      </button>
    );
  };

  const playPreview = () => {
    try {
      if (!audio) {
        setErrorMessage('This track does not have a preview.');
        return;
      }

      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
          currentlyPlayingAudio.pause();
          currentlyPlayingTrack?.setIsPlaying(false);
        }
        audio.play().catch((error) => {
          setErrorMessage('oof, this element has no  supported sources.');
        });
        currentlyPlayingAudio = audio;
        currentlyPlayingTrack = { setIsPlaying };
        setIsPlaying(true);
      }
    } catch (error) {
      setErrorMessage('oof, this element has no supported sources.');
    }
  };

  const showInfo = () => {
    setErrorMessage('No Preview available, Sorry');
  };

  useEffect(() => {
    if (audio) {
      audio.addEventListener('ended', () => setIsPlaying(false));
      return () => {
        audio.removeEventListener('ended', () => setIsPlaying(false));
        audio.pause();
      };
    }
  }, [audio]);

  const closeErrorMessage = () => {
    setErrorMessage('');
    if (audio) {
      audio.pause();
      setIsPlaying(false);
    }
  };

  return (
    <div className={`Track ${isPlaying ? 'Track-playing' : ''}`}>
      <img src={track.imageUrl} alt={`${track.name} album cover`} className="Track-image"/>
      <div className='Track-information'>
        <h3>{track.name}</h3>
        <p>
          {track.artist} | {track.album}
        </p>
      </div>
      {track.previewUrl ? (
        <button className='Track-preview' onClick={playPreview}>
          {isPlaying ? '||' : '▶'}
        </button>
      ) : (
        <button className='InfoButton' onClick={showInfo}>
          i
        </button>
      )}
      {renderAction()}

      {errorMessage && (
        <div className='ErrorMessage'>
          <p className='Errorp'>{errorMessage}</p>
          <button className='ErrorButton' onClick={closeErrorMessage}>Close</button>
        </div>
      )}
    </div>
  );
}


  export default Track;