function LoadSettings({ onClick }) {
    return (
        <>
            <div className="d-grid">
                <button type="button" className="btn btn-secondary opacity-75" onClick={onClick}><b>Load Saved Settings</b></button>
            </div>
        </>
    );
}

export default LoadSettings;