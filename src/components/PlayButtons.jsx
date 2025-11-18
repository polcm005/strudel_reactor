// This component is not used in the application
function PlayButtons({ onPlay, onStop, onToggle, isMusicPlaying }) {
  return (
      <>
          
      <div className="btn">
              <button id="play" type="button" className="btn btn-primary" onClick={onPlay}>Play</button>
       </div>
      </>
  );
}

export default PlayButtons;