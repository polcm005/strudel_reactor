// This component allows users to change the text size of the strudel repl interface
function TextSizeControl({ defaultFontSize, onChange }) {
    return (
        <>
        <div className="row">
                <div className="col-3 mt-4 mb-4"> 
                    <p className="form-label"><b>Text Size Control</b></p>
                </div>

            <div className="mt-4 mb-4 col-9">
                <input type="range" className="form-range" min="9" max="27" step="1" defaultValue={defaultFontSize} onChange={onChange} />
                </div>
            </div>
        </>
    );
}

export default TextSizeControl;