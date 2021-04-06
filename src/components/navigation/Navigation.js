import "./Navigation.scss"
import React from 'react'
import { Link } from 'react-router-dom'

function Navigation(props) {
    return (
        <div className = "navigationWrapper">
            <Link to="/">Landing</Link>
            <Link to="/browse">Browse</Link>
            <Link to="/browse/underground-hip-hop">Some Mood</Link>
            <Link to="/playlist/somePlaylist">Some Playlist</Link>
        </div>
    )
}

export default Navigation
