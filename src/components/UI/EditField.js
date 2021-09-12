import {useState} from "react";

const EditField = (props) => {
    const {label, edit, type='text'} = props
    const [data, setValue] = useState(props.data)
  return (
    <>
      <label htmlFor={label}>{label}:</label>
      {!edit && <span id={label}>{data}</span>}
      {edit && <input name={label} type={type} value={data} onChange={e => setValue(e.target.value)}/>}
    </>
  );
};

export default EditField;