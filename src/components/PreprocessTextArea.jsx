function PreprocessTextArea({ defaultValue, onChange }) {
  return (
      <>
        <label htmlFor="exampleFormControlTextarea1" className="form-label">Text to preprocess:</label>
          <textarea className="form-control shadow-lg border rounded-4" rows="30" id="proc" defaultValue={defaultValue} onChange={onChange}></textarea>
      </>
  );
}

export default PreprocessTextArea;