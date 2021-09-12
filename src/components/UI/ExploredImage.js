import { useDispatch } from "react-redux";
import {useState, useEffect} from "react";
import { personActions } from "../../store/person";
import { ImgContainer, BoundingBox } from "../StyledComponents/index";

const ExploredImage = (props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const handleClick = (i, face) => {
    setSelected(i) //set id of the selected bbox
    dispatch(personActions.setPerson(face)) //save selected person into redux
  }
  return (
    <ImgContainer width={500}>
      <img {...props} />
      {props.faces
        ? props.faces.map((face, i) => {
            return (
              <BoundingBox
                key={'person'+i}
                box={face.bbox}
                proportion={props.proportion}
                selected={selected === i} //paint the bbox border red if the current bbox is selected
                onClick={(e) =>
                  handleClick(i, face)
                }
              />
            );
          })
        : null}
    </ImgContainer>
  );
};

export default ExploredImage;
