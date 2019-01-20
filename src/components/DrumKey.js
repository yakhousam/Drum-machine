import React from 'react'

function DrumKey(props) {
   
  return (
    <button className="drum-pad" id={props.drum.name} onClick={props.onClick}>
        {props.drum.key}
      <audio className="clip" id={props.drum.key} src={props.drum.src} ></audio>
   
    </button>
  )
}

export default DrumKey;