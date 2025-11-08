// This component holds buttons which applies processing on songs
function ProcessButtons() {
  return (
      <>
          <div className="btn-group col-12">
              <button id="process" className="btn btn-outline-dark">Preprocess</button>
              <button id="process_play" className="btn btn-outline-dark">Process & Play</button>
          </div>
      </>
  );
}

export default ProcessButtons;