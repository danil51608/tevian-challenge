import styled from "styled-components";

export const FormWrapper = styled.div`
  width: 500px;
  margin: 20% auto;
`;

export const ImgContainer = styled.div`
  width: ${(props) => props.width}px;
//   overflow: hidden;
  position: relative;
  margin: 20px auto;
  & > img {
    width: 100%;
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

export const PageContainer = styled.div`
display: flex;
flex-direction: column;
align-items: center;
padding: 10px;
`

export const CardWrapper = styled.div`
display: flex;
flex-direction: column;
width: 400px;
background: #6E77D8;
color: #fff;
padding: 10px;
margin-bottom: 20px;
// border-radius: 10px;
box-shadow: 2px 2px 10px #000;
`

export const PersonInfo = styled.form`
font-size: 20px;
& > span{
    margin-top: -15px;
    margin-bottom: -5px;
    display: block;
}
& > label{
    font-size: 15px;
}
& > input{
    width: 100%;
}

`

export const ShowMore = styled.button`
background: none;
border: none;
color: #fff;
&:hover{
    color: #0069D9;
}
`

export const EditCard = styled.div`
text-align: right;
& span:nth-child(1){
    color: #29339B;
};
& span:nth-child(2){
    color: #FF3A20;
}
& span:hover{
    color: #fff;
};

& span{
    margin-left: 10px;
}
`

