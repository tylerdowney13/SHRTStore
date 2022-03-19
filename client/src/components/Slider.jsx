import { useState } from 'react';
import styled from 'styled-components';
import { ArrowLeftOutlined, ArrowRightOutlined } from '@material-ui/icons';
import { sliderItems } from '../data';
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';

const Container = styled.div`
    width: 100%;
    height: 100vh;
    display: flex;
    position: relative;
    overflow: hidden;

    ${mobile({
        display: "none"
    })}
`

const Arrow = styled.div`
    width: 50px;
    height: 50px;
    background-color: #ffffff;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: ${props => props.direction === "left" && "10px"};
    right: ${props => props.direction === "right" && "10px"};
    cursor: pointer;
    opacity: 0.7;
    z-index: 2;
`

const Wrapper = styled.div`
    height: 100%;
    display: flex;
    transform: translate(${props => props.slideIndex * -100}vw);
    transition: 1s ease all;
`

const Slide = styled.div`
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    background-color: ${props => props.bg};
`

const ImageContainer = styled.div`
    flex: 1;
    height: 95%;
    display: flex;
    align-content: center;
    justify-content: center;

`

const Img = styled.img`
    height: 80%;
`

const InfoContainer = styled.div`
    flex: 1;
    padding: 50px;
`

const Title = styled.h1`
    font-size: 70px;
`

const Description = styled.p`
    margin: 50px 0;
    font-size: 20px;
    font-weight: 500;
    letter-spacing: 3px;
`

const Button = styled.button`
    padding: 10px;
    font-size: 20px;
    background-color: transparent;
    cursor: pointer;
`

const Slider = () => {
    
    const [slideIndex, setSlideIndex] = useState(0);

    const handleClick = (direction) => {
        if (direction === "left") {
            setSlideIndex(slideIndex > 0 ? slideIndex -1 : 2);
        } else {
            setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
        }
    }

  return (
    <Container>
        <Arrow direction="left" onClick={() => handleClick("left")}>
            <ArrowLeftOutlined />
        </Arrow>
        <Wrapper slideIndex={slideIndex}>
            {sliderItems.map((item) => (
                <Slide bg={item.bg} key={item.id}>
                <ImageContainer>
                    <Img src={item.img}/>
                </ImageContainer>
                <InfoContainer>
                    <Title>{item.title}</Title>
                    <Description>{item.desc}</Description>
                    <Link to={`/products/${item.category}`}>
                        <Button>Shop Now</Button>
                    </Link>
                </InfoContainer>
            </Slide>
            ))}
        </Wrapper>
        <Arrow direction="right" onClick={() => handleClick("right")}>
            <ArrowRightOutlined />
        </Arrow>
    </Container>
  )
}

export default Slider