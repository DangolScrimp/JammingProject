import React from 'react';
import Track from '../track/track';
import './tracklist.css'

function TrackList(props) {
    return (
        <div className='TrackList'>
            {props.tracks.map((track) => {
                return (
                    <Track
                        track={track}
                        key={track.id}
                        onAdd={props.onAdd}
                        isRemoval={props.isRemoval}
                        onRemove={props.onRemove} />
                );
            })}
        </div>
    );
}

export default TrackList;