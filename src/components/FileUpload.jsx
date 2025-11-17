// This component allows users to upload a JSON file to be read by the application
function FileUpload() {
    return (
        <>
        <div className="opacity-75">
        
            <div className="input-group">
                <input type="file" className="form-control" id="inputGroupFile010"/>
                <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
            </div>
        </div>
        </>
    );
}

export default FileUpload;