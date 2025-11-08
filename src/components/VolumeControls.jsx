function VolumeControls() {
    return (
        <>
            <div className="btn-group col-12">
                <button id="decrease" className="btn btn-outline-danger">Decrease Volume</button>
                <button id="increase" className="btn btn-outline-primary">Increase Volume</button>
            </div>
        </>
    );
}

export default VolumeControls;