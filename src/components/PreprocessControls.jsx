// This component to set the cycles per second
function PreprocessControls() {
    return (
    <>
        <div className="input-group mb-4">
                <span className="input-group-text" id="cpmControl"><b>Set CPM</b></span>
            <input type="text" className="form-control" placeholder="30" aria-label="cpm control form" aria-describedby="cpmControl" id="cpm_input_field" />
        </div>
    </>
  );
}

export default PreprocessControls;