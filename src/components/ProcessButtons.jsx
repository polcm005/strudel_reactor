// This component has not been used in the application
function ProcessButtons({processingLogic}) {
  return (
      <>
          <div className="btn-group col-12">
              <button id="process" className="btn btn-outline-dark" onClick={processingLogic}>Preprocess</button>
              <button id="process_play" className="btn btn-outline-dark">Process & Play</button>
          </div>
      </>
  );
}

export default ProcessButtons;