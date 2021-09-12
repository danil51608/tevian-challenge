import {useState, useEffect} from "react";

const EditField = (props) => {
    const {label, edit, type='text', data=''} = props
    const [value, setValue] = useState(data)

    useEffect(() => {
        setValue(data)
    }, [data])

  return (
    <>
      <label htmlFor={label}>{label}:</label>
      {!edit && <span id={label}>{data}</span>}
      {edit && <input name={label} type={type} value={value} onChange={e => setValue(e.target.value)}/>}
    </>
  );
};

export default EditField;