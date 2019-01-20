import React, { Component } from "react";
import "./App.css";
import DrumKey from "./components/DrumKey";
import sound from "./sound";

const drums = [
  { name: "clap01", key: "Q", src: sound.clap01 },
  { name: "clap02", key: "W", src: sound.clap02 },
  { name: "clap03", key: "E", src: sound.clap03 },
  { name: "clap04", key: "A", src: sound.clap04 },
  { name: "clap05", key: "S", src: sound.clap05 },
  { name: "clap06", key: "D", src: sound.clap06 },
  { name: "clap07", key: "Z", src: sound.clap07 },
  { name: "clap08", key: "X", src: sound.clap08 },
  { name: "clap09", key: "C", src: sound.clap09 }
];

class App extends Component {
  constructor() {
    super();
    this.state = {
      drum: {}
    };
  }

  componentWillUnmount() {
    window.removeEventListener("keydown", this.playKeyDrum);
    window.removeEventListener("keyup", this.KeyUp);
  }
  componentDidMount() {
    window.addEventListener("keydown", this.playKeyDrum);
    window.addEventListener("keyup", this.KeyUp);
  }
  KeyUp = () => {
    Array.from(document.getElementsByTagName("button")).forEach(element => {
      element.classList.remove("keypress");
    });
  };
  handleClick = e => {
    const id = e.target.id;
    const drum = drums.filter(drum => drum.name === id);
    this.setState({
      drum: drum[0]
    });
    e.target.firstElementChild.currentTime = 0;
    e.target.firstElementChild.play();
  };

  playKeyDrum = e => {
    const key = e.key.toUpperCase();
    const drum = drums.filter(drum => drum.key === key);
    if (drum.length > 0) {
      this.setState({
        drum: drum[0]
      });
      const audioElement = document.getElementById(key);
      audioElement.currentTime = 0;
      audioElement.play();
      audioElement.parentElement.classList.add("keypress");
    }
  };

  render() {
    return (
      <>
        <h1>Drum Machine</h1>
        <div id="drum-machine">
          <div className="pad">
            {drums.map((drum, i) => (
              <DrumKey key={i} drum={drum} onClick={this.handleClick} />
            ))}
          </div>

          <h3>Audio clip</h3>
          <div className="display-container">
            <div id="display">{this.state.drum.name}</div>
          </div>
        </div>
      </>
    );
  }
}

export default App;
