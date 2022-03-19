import { Send } from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    height: 60vh;
    background-color: #fcf5f5;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
`

const Title = styled.h1`
    font-size: 70px;
    margin-bottom: 20px;
`

const Description = styled.p`
    font-size: 24px;
    font-weight: 300;
    margin-bottom: 20px;

    ${mobile({
        textAlign: "center",
    })}
`

const InputContainer = styled.div`
    width: 40%;
    height: 40px;
    background-color: white;
    display: flex;
    justify-content: space-between;
    border: 1px solid lightgrey;

    ${mobile({
        width: "80%"
    })}
`

const Input = styled.input`
    border: none;
    flex: 8;
    font-size: 20px;
    padding-left: 15px;
`

const Button = styled.button`
    flex: 1;
    border: none;
    background-color: grey;
    color: white;
`

const Newsletter = () => {
  return (
    <Container>
        <Title>Newsletter</Title>
        <Description>
            Subscribe to our newsletter for more great deals!
        </Description>
        <InputContainer>
            <Input placeholder='e-mail'/>
            <Button>
                <Send />
            </Button>
        </InputContainer>
    </Container>
  )
}

export default Newsletter