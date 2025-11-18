// This component holds the volume slider
function VolumeSlider({ onChange }) {
    return (
        <>
            <label htmlFor="customRange1" className="form-label"><b>Volume Control</b></label>
            <input type="range" className="form-range mt-2" min="0" max="2" step="0.01" id="volumeControl" onMouseUp={onChange}/>
        </>
    );
}

export default VolumeSlider;