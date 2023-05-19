import { ButtonWrapper } from "./styles";

export default function Button(props) {
  return (
    <ButtonWrapper {...props}>
      {props.text}
      {props.children}
    </ButtonWrapper>
  )
}