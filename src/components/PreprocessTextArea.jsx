// This component holds the input form where users input text
function PreprocessTextArea({ defaultValue, onChange }) {
  return (
      <>
          <label htmlFor="exampleFormControlTextarea1" className="form-label"><b>Text to preprocess:</b></label>
          <textarea className="form-control shadow-lg border rounded-4" rows="16" id="proc" defaultValue={defaultValue} onChange={onChange}></textarea>
      </>
  );
}

export default PreprocessTextArea;