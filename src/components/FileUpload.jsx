// This component allows users to upload a JSON file to be read by the application
function FileUpload() {
    return (
        <>
        <div className="mb-2 pb-2 opacity-75">
        <p><b>JSON File Upload</b></p>
            <div className="input-group">
                <input type="file" className="form-control" id="inputGroupFile010"/>
                <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
            </div>
        </div>
        </>
    );
}

export default FileUpload;