// This component to set the cycles per second
function PreprocessControls({ onChange }) {
    return (
    <>
        <div className="input-group mb-4">
            <span className="input-group-text" id="cpmControl"><b>Set CPS</b></span>
                <input type="text" className="form-control" placeholder="30" aria-label="cps control form" aria-describedby="cpsControl" id="cps_input_field" onChange={onChange} />
                {/*<button className="btn btn-outline-secondary" type="submit" id="setCPMButton" onClick={onClick}>Submit</button>*/}
        </div>
    </>
  );
}

export default PreprocessControls;