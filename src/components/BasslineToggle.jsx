// This component allows users to select which instrumentals they wish to enable or disable
function BasslineToggle({onChange, checkedValue}) {
    return (
        <>
            <div className="col-2">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="b" onChange={onChange} checked={checkedValue}/>
                    <label className="form-check-label">
                        Bassline
                    </label>
                </div>
            </div>
        </>
    );
}

export default BasslineToggle;