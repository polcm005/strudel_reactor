// This component holds the the toggle button and its conditional logic depending on the isMusicPLaying state variable
function ToggleButton({ onToggle, musicStatus }) {
    return (
        <>
            <div className="d-grid mt-2 mb-3 opacity-100">
                <button type="button" className={musicStatus ? "btn btn-danger" : "btn btn-primary"} onClick={onToggle}>{musicStatus ? "Stop Music" : "Play Music"}</button>
            </div>
        </>
    );
}

export default ToggleButton;