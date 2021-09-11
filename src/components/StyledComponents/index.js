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
  font-size: 15px;
  margin: 10px auto;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;

  & > label {
    font-size: 25px;
    color: #0069d9;
    margin-bottom: -10px;
  }

  & > label:hover {
    color: #002a57;
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
  border: 1px solid #b3d2f4;
  border-radius: 6px;

  &:hover{
      border: 3px solid #0069D9;
  }
`;

export const SettingsContainer = styled.div`
width: 100%;
max-width: 600px;
background: #343A40;
padding: 20px;
margin: 20px 0;
& > input{
    width: 100%;
    padding: 5px;
    margin-bottom: 20px;
    font-size: 18px;
}
& > label{
    font-size: 20px;
    color: #fff;
    margin: 0;
}
`

export const Button = styled.button`
border: none;
margin: 10px auto;
min-width: 100px;
height: 40px;
border-radius: 5px;
background: #0069D9;
color: #fff;
&:hover{
    background: #002a57;
}
`

export const Instuctions = styled.div`
width: 100%;
text-align: center;
`

export const HomeSection = styled.div`
display: flex;
flex-direction: column;
align-items: center;
`

