// This component allows users to toggle the main_arp instrumentals
function MainArpToggle({ onChange, checkedValue }) {
    return (
        <>
            <div className="col-2">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="ma" onChange={onChange} checked={checkedValue}/>
                    <label className="form-check-label">
                        Main_Arp
                    </label>
                </div>
            </div>
        </>
    );
}

export default MainArpToggle;