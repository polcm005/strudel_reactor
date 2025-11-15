// This component allows users to select which instrumentals they wish to enable or disable
function InstrumentToggle({onChange}) {
    return (
        <>
        <p><b>Toggle Instrumental Elements</b></p>
        <div className="row mb-4">
            <div className="col-2">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="d1"/>
                    <label className="form-check-label" htmlFor="d1">
                        Drums 1
                    </label>
                </div>
            </div>
            <div className="col-2">
                <div className="form-check">
                    <input className="form-check-input" type="checkbox" value="" id="d2" />
                    <label className="form-check-label" htmlFor="b1">
                        Drums 2
                    </label>
                </div>
                </div>
            <div className="col-2">
                <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="b1"/>
                    <label className="form-check-label" htmlFor="b1">
                        Bassline 1
                    </label>
                </div>
             </div>
            <div className="col-2">
                <div className="form-check">
                        <input className="form-check-input" type="checkbox" value="" id="b1" onChange={onChange} defaultChecked/>
                    <label className="form-check-label" htmlFor="b2">
                        Bassline 2
                    </label>
                </div>
            </div>
        </div>
        </>
    );
}

export default InstrumentToggle;