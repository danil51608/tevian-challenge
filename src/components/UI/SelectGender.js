import {useState, useEffect} from "react";

const SelectGender = (props) => {
    const {label, edit, type='text'} = props
    const [data, setValue] = useState(props.data)
    useEffect(() => {
        setValue(props.data)
    }, [props.data])

  return (
    <>
      <label htmlFor={label}>{label}:</label>
      <br/>
      {!edit && <div>{data === 'male' ? <span>&#128102;</span> : <span>&#128103;</span>}<span id={label}>{data}</span></div>}
      {edit && <select
        style={{ fontSize: "20px", fontWeight: "700" }}
        onChange={(e) => setValue(e.target.value)}
        id={label}
      >
        <option selected={data === "male"} value="male">
          &#128102; Male
        </option>
        <option selected={data === "female"} value="female">
          &#128103; Female
        </option>
      </select>
      }
      <br/>
    </>
  );
};

export default SelectGender;