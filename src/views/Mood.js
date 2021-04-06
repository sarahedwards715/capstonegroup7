import React from 'react'

function Mood(props) {
    return (
        <div>
            Hello from Mood!
            {props.match.params.mood}
        </div>
    )
}

export default Mood
