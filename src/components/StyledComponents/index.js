import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 500px;
  margin: 20% auto;
`;

export const ImgContainer = styled.div`
  width: 500px;
  overflow: hidden;
  position: relative;
  margin: 20px auto;
  & > img {
    width: 500px;
  }
`;

export const UploadWrapper = styled.div`
  font-size: 25px;
  margin: 0 auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #0069d9;

  & > span {
    color: #000;
  }

  & > label:hover {
    color: #000;
  }
  & > input {
    display: none;
  }
`;

export const BoundingBox = styled.div`
  position: absolute;
  width: ${(props) => props.box.width/props.proportion}px;
  height: ${(props) => props.box.height/props.proportion}px;
  top: ${(props) => props.box.y/props.proportion}px;
  left: ${(props) => props.box.x/props.proportion}px;
  z-index: 10;
  border: 3px solid #000;
`;

export const StyledUpload = (props) => {
  return (
    <UploadWrapper>
      <label htmlFor="upload">
        <FontAwesomeIcon icon={faPlus} />
      </label>
      <span>Add Image</span>
      <input type="file" id="upload" {...props} />
    </UploadWrapper>
  );
};

export const StyledImage = (props) => {
  return (
    <ImgContainer>
      <img {...props} />
      {props.faces
        ? props.faces.map((face, i) => {
            console.log(face.bbox);
            return <BoundingBox key={i} box={face.bbox} proportion={props.proportion}/>;
          })
        : null}
    </ImgContainer>
  );
};
