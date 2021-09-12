import styled from "styled-components";
import {createGlobalStyle } from "styled-components"

export const GlobalStyle = createGlobalStyle`
*{
    margin: 0;
    padding: 0;
    font-family: 'Urbanist', sans-serif;
}
`

export const FormWrapper = styled.div`
  width: 500px;
  margin: 20% auto;
`;

export const ImgContainer = styled.div`
  width: ${(props) => props.width}px;
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
  border-style: solid;
  border-color: ${(props) => props.selected ? 'red' : 'blue'};
  border-width: ${(props) => props.selected ? '3px' : '1px'}; 
  border-radius: 6px;

  &:hover{
      border: 3px solid #0069D9;
  }
`;

export const SettingsContainer = styled.form`
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

export const PersonInfo = styled.form`
font-size: 25px;
& > span{
    margin-top: -15px;
    margin-bottom: -5px;
    display: block;
    font-family: 'Roboto';
}
& > label{
    font-size: 15px;
    text-decoration: underline;
}
& > input{
    width: 100%;
}
`


export const CardWrapper = styled.div`
display: flex;
flex-wrap: wrap;
width: 100%;
max-width: 600px;
background: #F8F8FF;
color: #000;
padding: 20px;
margin-bottom: 20px;
& >  ${ImgContainer}{
    flex: 1;
    margin: -20px;
    margin-right: 20px;
    min-width: 100px;
    background: #F8F8FF;
};

& > ${PersonInfo} {
    flex: 2;
    min-width: 300px;
}
box-shadow: 0.25px 1.5px 5px #999999;
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
width: 100%;
& span:nth-child(1):hover{
    color: #0069d9;
};
& span:nth-child(2):hover{
    color: #FF3A20;
}
& span{
    color: #000;
};

& span{
    margin-left: 10px;
}
`

