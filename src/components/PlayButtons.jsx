function PlayButtons({ onPlay, onStop, onToggle }) {
  return (
      <>
      <div className="btn" role="group">
              <button id="play" className="btn btn-outline-primary" onClick={onPlay}>Play</button>
              <button id="stop" className="btn btn-outline-danger" onClick={onStop}>Stop</button>
              <button id="toggle" className="btn btn-outline-danger" onClick={onToggle}>Toggle</button>
       </div>
      </>
  );
}

export default PlayButtons;