import { useDispatch } from "react-redux";
import { personActions } from "../../store/person";
import { ImgContainer, BoundingBox } from "../StyledComponents/index";

const ExploredImage = (props) => {
  const dispatch = useDispatch();
  return (
    <ImgContainer>
      <img {...props} />
      {props.faces
        ? props.faces.map((face, i) => {
            return (
              <BoundingBox
                key={'person'+i}
                box={face.bbox}
                proportion={props.proportion}
                onClick={(e) =>
                  dispatch(personActions.setPerson(face))
                }
              />
            );
          })
        : null}
    </ImgContainer>
  );
};

export default ExploredImage;
