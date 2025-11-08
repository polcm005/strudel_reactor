function ToggleButton({onToggle}) {
    return (
        <>
            <div className="btn">
                <button id="play" type="button" className="btn btn-primary" onClick={onToggle}>Toggle Play/Stop</button>
            </div>
        </>
    );
}

export default ToggleButton;