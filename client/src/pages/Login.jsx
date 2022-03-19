import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { login } from '../redux/apiCalls';
import { mobile } from '../responsive';
import { useNavigate } from 'react-router-dom';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/6984650/pexels-photo-6984650.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: cover;

    ${mobile({
        background: "rgba(0, 200, 200, 0.5)"
    })}
`

const Wrapper = styled.div`
    width: 30%;
    background-color: white;
    padding: 20px;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;

    ${mobile({
        width: "75%"
    })}
`

const Title = styled.h1`
    font-size: 24px;
    font-weight: 300;
`

const Form = styled.form`
    display: flex;
    flex-direction: column;
    width: 95%;
`

const Input = styled.input`
    flex: 1;
    min-width: 95%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Button = styled.button`
    width: 40%;
    border: none;
    margin-top: 10px;
    padding: 10px 15px;
    background-color: teal;
    color: white;
    cursor: pointer;
    font-size: 20px;

    &:disabled {
        color: green;
        cursor: not-allowed;
    }
`

const Link = styled.a`
    margin: 5px 0px;
    font-size: 16px;
    text-decoration: underline;
    cursor: pointer;
`

const Error = styled.span`
    color: red;
    margin: 3px;
`

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const { isFetching, error } = useSelector((state) => state.user);

    console.log(error);

    const handleLogin = (e) => {
        e.preventDefault();
        login(dispatch, { username, password })
        navigate("/");
    }

  return (
    <Container>
        <Wrapper>
            <Title>SIGN IN</Title>
            <Form>
                <Input placeholder="username" onChange={(e) => setUsername(e.target.value)}/>
                <Input placeholder="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                <ButtonContainer>
                    <Button onClick={handleLogin} disabled={isFetching}>Login</Button>
                    {error && <Error>Invalid Username or Password</Error>}
                    <Link>Forgot Password?</Link>
                    <Link>Create Account</Link>
                </ButtonContainer>
            </Form>
        </Wrapper>
    </Container>
  )
}

export default Login