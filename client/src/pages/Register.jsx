import styled from 'styled-components';
import { mobile } from '../responsive';
import { useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
    width: 100vw;
    height: 100vh;
    background: linear-gradient(rgba(255, 255, 255, 0.5), rgba(255, 255, 255, 0.5)), url("https://images.pexels.com/photos/6984661/pexels-photo-6984661.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940");
    display: flex;
    align-items: center;
    justify-content: center;

    ${mobile({
        background: "rgba(0, 200, 200, 0.5)"
    })}
`

const Wrapper = styled.div`
    width: 40%;
    background-color: white;
    padding: 20px;

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
    flex-wrap: wrap;
`

const Input = styled.input`
    flex: 1;
    min-width: 40%;
    margin: 20px 10px 0px 0px;
    padding: 10px;
`

const ButtonContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Agreement = styled.span`
    font-size: 15px;
    margin: 20px 0px;
`

const Button = styled.button`
    width: 40%;
    border: none;
    padding: 15px 20px;
    background-color: teal;
    color: white;
    cursor: pointer;
`

const PasswordErrorContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const PasswordErrorText = styled.div`
    color: red;
`

const Register = () => {
    // Create navigate
    const navigate = useNavigate();

    // Create password error state
    const [passwordError, setPasswordError] = useState(false);

    // Get user input
    const firstNameRef = useRef();
    const lastNameRef = useRef();
    const emailRef = useRef();
    const usernameRef = useRef();
    const passwordRef = useRef();
    const confirmPasswordRef = useRef();

    const registerUser = async (e) => {
        e.preventDefault();

        const firstName = firstNameRef.current.value;
        const lastName = lastNameRef.current.value;
        const username = usernameRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const confirmPassword = confirmPasswordRef.current.value;

        if (password !== confirmPassword) {
            setPasswordError(true);
            setTimeout(() => {
                setPasswordError(false);
            }, 2000)
        }

        const userData = {
            firstName: firstName,
            lastName: lastName,
            username: username,
            password: password,
            email: email,
        }

        try {
            const registerRes = await axios.post("http://localhost:5000/api/auth/register", userData)
            console.log(registerRes);
            navigate("/login");
        } catch (error) {
            console.log(error);
        }
    }


    return (
    <Container>
        <Wrapper>
            <Title>CREATE ACCOUNT</Title>
            <Form onSubmit={registerUser}>
                <Input placeholder="first name" ref={firstNameRef} required/>
                <Input placeholder="last name" ref={lastNameRef} required/>
                <Input placeholder="username" ref={usernameRef} required/>
                <Input placeholder="email" ref={emailRef} required/>
                <Input placeholder="password" ref={passwordRef} required/>
                <Input placeholder="confirm password" ref={confirmPasswordRef} required/>
                {passwordError &&
                    <PasswordErrorContainer>
                        <PasswordErrorText>Passwords do not match</PasswordErrorText>
                    </PasswordErrorContainer>
                }
                <ButtonContainer>
                    <Agreement>
                        By creating an account, I consent to the processing of my
                        personal data in accordance with the <b>Privacy Policy</b>
                    </Agreement>
                    <Button type="submit">Create Account</Button>
                </ButtonContainer>
            </Form>
        </Wrapper>
    </Container>
    )
}

export default Register