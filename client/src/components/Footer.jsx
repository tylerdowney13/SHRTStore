import { EmailOutlined, Facebook, Instagram, Phone, Pinterest, RoomOutlined, Twitter } from '@material-ui/icons';
import styled from 'styled-components';
import { mobile } from '../responsive';

const Container = styled.div`
    display: flex;

    ${mobile({
        flexDirection: "column"
    })}
`

const Right = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
`

const Title2 = styled.div`
    font-size: 25px;
    font-weight: 500;
    margin-bottom: 10px;
`

const ContactItem = styled.h1`
    font-size: 20px;
    font-weight: 300;
    margin-bottom: 10px;
`

const Payment = styled.img`
    width: 50%;
    height: 60px;

    ${mobile({
        width: "95%",
        height: "70px"
    })}
`

const Center = styled.div`
    flex: 1;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    ${mobile({
        display: "none"
    })}
`

const Title = styled.h3`
    margin-bottom: 30px;
    margin-right: 55px;
`

const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style: none;
    display: flex;
    flex-wrap: wrap;
`

const ListItem = styled.li`
    width: 33%;
    margin-bottom: 10px;
`

const Left = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const Logo = styled.h1`

`

const Desc = styled.p`
    margin: 20px 0;
`

const SocialContainer = styled.div`
    display: flex;
    height: 45px;
`

const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: ${props => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    opacity: 0.8;
    transition: 0.3s ease all;

    &:hover {
        opacity: 1;
        width: 42px;
        height: 42px;
    }
`



const Footer = () => {
  return (
    <Container>
        <Left>
            <Logo>E-Commerce App</Logo>
            <Desc>Designed with the consumer in mind.</Desc>
            <SocialContainer>
                <SocialIcon color="#3B5999">
                    <Facebook />
                </SocialIcon>
                <SocialIcon color="#E4405F">
                    <Instagram />
                </SocialIcon>
                <SocialIcon color="#55ACEE">
                    <Pinterest/>
                </SocialIcon>
                <SocialIcon color="#E60023">
                    <Twitter/>
                </SocialIcon>
            </SocialContainer>
        </Left>
        <Center>
            <Title>Useful Links</Title>
            <List>
                <ListItem>Home</ListItem>
                <ListItem>Cart</ListItem>
                <ListItem>Men's</ListItem>
                <ListItem>Women's</ListItem>
                <ListItem>Accessories</ListItem>
                <ListItem>Order Tracking</ListItem>
                <ListItem>Wishlist</ListItem>
                <ListItem>Terms</ListItem>
            </List>
        </Center>
        <Right>
            <Title2>Contact</Title2>
            <ContactItem>
                <RoomOutlined style={{marginRight: "10px"}}/> 123 Commerce Way, LA 238328
            </ContactItem>
            <ContactItem>
                <Phone style={{marginRight: "10px"}}/>+1 (123) 123-45678
            </ContactItem>
            <ContactItem>
                <EmailOutlined style={{marginRight: "10px"}}/>contact@ecommerce.com
            </ContactItem>
            <Payment src="https://store-cdn.arduino.cc/uni/wysiwyg/Payment_Options.jpg" />
        </Right>
    </Container>
  )
}

export default Footer