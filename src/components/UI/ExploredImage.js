import { useDispatch } from "react-redux";
import {useState} from "react";
import { personActions } from "../../store/person";
import { ImgContainer, BoundingBox } from "../StyledComponents/index";

const ExploredImage = (props) => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(null);
  const handleClick = (i, face) => {
    setSelected(i)
    dispatch(personActions.setPerson(face))
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
                selected={selected === i}
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
