// This component allows users to enable and disable different music effects
function EffectSelection() {
    return (
        <>
        <div className="mb-4">
        <p><b>Toggle Effects</b></p>
                <div className="form-check form-switch form-check-inline me-5">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault"/>
                    <label className="form-check-label" for="flexSwitchCheckDefault">Effect 1</label>
            </div>
                <div className="form-check form-switch form-check-inline me-5">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckChecked" checked/>
                    <label className="form-check-label" for="flexSwitchCheckChecked">Effect 2</label>
            </div>
                <div className="form-check form-switch form-check-inline me-5">
                    <input className="form-check-input" type="checkbox" id="flexSwitchCheckDisabled" disabled/>
                    <label className="form-check-label" for="flexSwitchCheckDisabled">Effect 3</label>
                </div>
        </div>
        </>
    );
}

export default EffectSelection;