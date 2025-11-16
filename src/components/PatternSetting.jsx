function PatternSetting({ onChange }) {
    return (
        <>
            <div className="col-4">
            <p><b>Change Pattern</b></p>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value="0" onChange={onChange} defaultChecked/>
                <label className="form-check-label" htmlFor="inlineRadio1">1</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value="1" onChange={onChange} />
                    <label className="form-check-label" htmlFor="inlineRadio2">2</label>
                </div>
                <div className="form-check form-check-inline">
                    <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value="2" onChange={onChange} />
                    <label className="form-check-label" htmlFor="inlineRadio3">3</label>
                </div>
            </div>
        </>
    );
}

export default PatternSetting;