// This component provides the button to save the current settings
function SaveSettings({ onClick }) {
    return (
        <>
            <div className="d-grid">
                <button type="button" className="btn btn-success opacity-75"  onClick={onClick}><b>Save Current Settings</b></button>
            </div>
        </>
    );
}

export default SaveSettings;