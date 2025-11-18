// This component allows users to toggle the drums instrumentals
function DrumsToggle({ onChange, checkedValue }) {
    return (
        <>
            <div className="col-2">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="d" onChange={onChange} checked={checkedValue}/>
                    <label className="form-check-label">
                        Drums
                    </label>
                </div>
            </div>
        </>
    );
}

export default DrumsToggle;