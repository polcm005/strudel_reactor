// This component allows users to toggle the drums2 instrumentals
function Drums2Toggle({ onChange }) {
    return (
        <>
            <div className="col-2">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="d2" onChange={onChange} defaultChecked />
                    <label className="form-check-label">
                        Drums2
                    </label>
                </div>
            </div>
        </>
    );
}

export default Drums2Toggle;