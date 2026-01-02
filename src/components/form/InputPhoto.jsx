import styles from './Input.module.css'

function InputPhoto({text, handleOnChange, photoPreview}){

    return(
        <div className={styles.form_control}>
            <label htmlFor={"file"}>{text}:</label>
            <input type="file" name="file" accept="image/*" onChange={handleOnChange} />
            {photoPreview && (
                <img src={photoPreview} alt="Prévia da foto" style={{ width: "120px", borderRadius: "50%"}} />         
            )}
        </div>
    );

}

export default InputPhoto