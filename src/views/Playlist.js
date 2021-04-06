import React from 'react'

function Playlist(props) {
    return (
        <div>
            Hello From Playlist
            {props.match.params.playlistId}
        </div>
    )
}

export default Playlist
