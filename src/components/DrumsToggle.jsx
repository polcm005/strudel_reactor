// This component allows users to toggle the drums instrumentals
function InstrumentToggle({ onChange }) {
    return (
        <>
            <div className="col-2">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="b" onChange={onChange} defaultChecked />
                    <label className="form-check-label" htmlFor="b">
                        Drums
                    </label>
                </div>
            </div>
        </>
    );
}

export default InstrumentToggle;