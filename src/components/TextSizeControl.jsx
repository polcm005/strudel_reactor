function TextSizeControl({ defaultFontSize, onChange }) {
    return (
    <>        
            <label htmlFor="volume_range" className="form-label">Text Size Control</label>
            <input type="range" className="form-range" min="9" max="27" step="1" defaultValue={defaultFontSize} onChange={onChange} />
        </>
    );
}

export default TextSizeControl;