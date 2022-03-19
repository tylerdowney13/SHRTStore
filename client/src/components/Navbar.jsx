import styled from 'styled-components';
import { Search, ShoppingCartOutlined, Settings } from '@material-ui/icons';
import { Badge } from '@material-ui/core';
import { mobile } from '../responsive';
import { useSelector, useDispatch } from "react-redux";
import { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout } from '../redux/apiCalls';

const Container = styled.div`
    height: 60px;

    ${mobile({
        height: "50px"
    })}
`

const Wrapper = styled.div`
    padding: 10px 20px;
    display: flex;
    justify-content: space-between;
    align-items: center;

    ${mobile({
        padding: "10px 0px"
    })}
`

const Left = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
`

const Language = styled.span`
    font-size: 14px;
    cursor: pointer;

    ${mobile({
        display: "none"
    })}
`

const SearchContainer = styled.div`
    border: 0.5px solid lightgray;
    display: flex;
    align-items: center;
    margin-left: 25px;
    padding: 5px;
`

const Input = styled.input`
    border: none;

    &:focus {
        outline: none;
    }

    ${mobile({
        width: "50px"
    })}
`

const Logo = styled.h1`
    font-weight: bold;

    ${mobile({
        fontSize: "18px"
    })}
`

const Center = styled.div`
    flex: 1;
    text-align: center;
`

const Right = styled.div`
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: flex-end;

    ${mobile({
        flex: 2,
        justifyContent: "center"
    })}
`

const MenuItem = styled.div`
    font-style: 14px;
    cursor: pointer;
    margin-left: 25px;

    ${mobile({
        fontSize: "14px",
        marginLeft: "10px"
    })}
`

const Navbar = () => {
    const quantity = useSelector(state => state.cart.quantity)
    const user = useSelector(state => state.user.currentUser);

    const searchRef = useRef();

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const handleLogout = () => {
        logout(dispatch);
        localStorage.removeItem("persist:root");
        navigate("/");

    }

    const handleSearch = () => {
        const category = searchRef.current.value;
        console.log(searchRef);

        if (category !== undefined) {
            navigate(`/products/${category}`);
        }
    }

  return (
    <Container>
        <Wrapper>
            <Left>
                <Language>EN</Language>
                <SearchContainer>
                    <Input placeholder="search" ref={searchRef}/>
                    <Search style={{color: "gray", fontSize: "16px"}} onClick={handleSearch}  />
                </SearchContainer>
            </Left>
            <Center>
                <Link to="/" style={{color: "black", textDecoration: "none"}}>
                    <Logo>SHRT.</Logo>
                </Link>
            </Center>
            <Right>
                {!user ? (
                    <>
                        <Link to="/register" style={{textDecoration: "none", color: "black"}}>
                            <MenuItem>
                                Register
                            </MenuItem>
                        </Link>
                        <MenuItem>
                            <Link to="/login" style={{textDecoration: "none", color: "black"}}>
                                Login
                            </Link>
                        </MenuItem>
                    </>
                ) : (
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                )}
                {
                    user &&
                        <Link to="/orders" style={{textDecoration: "none", color: "black"}}>
                            <MenuItem>
                                Orders
                            </MenuItem>
                        </Link>
                }
                
                {
                    user?.isAdmin &&
                        <MenuItem>
                                <Link to="/admin" style={{textDecoration: "none", color: "black"}}>
                                    <Settings />
                                </Link>
                        </MenuItem>
                }
                <Link to="/cart" style={{textDecoration: "none", color: "black"}}>
                    <MenuItem>
                    <Badge badgeContent={quantity} color="primary">
                        <ShoppingCartOutlined />
                    </Badge>
                    </MenuItem>
                </Link>
            </Right>
        </Wrapper>
    </Container>
  )
}

export default Navbar