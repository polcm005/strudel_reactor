// This component has not been used in the application
function StopButton({ onPlay, onStop, onToggle, isMusicPlaying }) {
    return (
        <>
            <div className="btn">
                <button id="stop" type="button" className="btn btn-danger" onClick={onStop}>Stop</button>
            </div>
        </>
    );
}

export default StopButton;