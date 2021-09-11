import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faPen } from "@fortawesome/free-solid-svg-icons";
import { UploadWrapper } from "../StyledComponents/index";


const Upload = (props) => {
  const {image} = props;
  return (
    <UploadWrapper>
      <label htmlFor="upload">
        {!image && <FontAwesomeIcon icon={faPlus} />}
        {image && <FontAwesomeIcon icon={faPen} />}
      </label>
      <span>{image ? 'Change the' : 'Add an'} image</span>
      <input type="file" id="upload" {...props} />
    </UploadWrapper>
  );
};

export default Upload;
