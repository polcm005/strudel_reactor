// This component allows users to toggle the drums instrumentals
function DrumsToggle({ onChange }) {
    return (
        <>
            <div className="col-2">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="d" onChange={onChange} defaultChecked />
                    <label className="form-check-label">
                        Drums
                    </label>
                </div>
            </div>
        </>
    );
}

export default DrumsToggle;