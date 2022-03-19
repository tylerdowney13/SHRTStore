import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { userRequest } from '../requestMethods';
import { Link } from 'react-router-dom';
import "../components/adminConsole/productList.css";
import { mobile } from '../responsive';

const Container = styled.div`
    
`

const Wrapper = styled.div`
    margin: 10px;
`

const OrdersHeader = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
`

const OrdersHeaderText = styled.span`
    font-size: 30px;
    font-weight: 600;
`

const OrdersBottom = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const OrdersContainer = styled.div`
    height: 80vh;
    width: 80vw;
`

const OrdersCardContainer = styled.div`
    margin-bottom: 10px;
`

const OrdersCard = styled.div`
    width: 95%;
    height: 200px;
    background-color: #C3D5E2;
    border-radius: 10px;
    padding: 10px;
`

const OrdersCardHeaderContainer = styled.div`
    padding: 10px;
    display: flex;
    justify-content: space-between;

    ${mobile({
        flexDirection: "column"
    })}
`

const OrdersCardHeader = styled.span`
    font-size: 24px;

    ${mobile({
        fontSize: "16px"
    })}
`

const OrdersCardBody = styled.div`
    margin: 10px;
    display: flex;
    flex-direction: column;

    ${mobile({
        margin: "0px"
    })}
`

const OrdersCardText = styled.span`
    font-size: 20px;
    padding: 10px;
`

const OrdersCardButton = styled.button`
    width: 200px;
    height: 30px;
    background-color: #C3D5E2;
    border-radius: 10px;
    font-weight: 600;
    font-size: 20px;
    margin-top: 10px;

    &:hover {
        background-color: #9CBFF1;
    }
`

const Orders = () => {
    const user = useSelector(state => state.user.currentUser);
    const userId = user._id;

    const [orders, setOrders] = useState([]);

    useState(() => {
        const getOrders = async () => {
            try {
                const ordersRes = await userRequest.get(`/orders/find/${userId}`);
                const ordersData = ordersRes.data;
                setOrders(ordersData);
            } catch (error) {
                console.log(error);
                window.location.reload();
            }
        };
        userId && getOrders();
    }, [userId]);

    return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <OrdersHeader>
                <OrdersHeaderText>Orders ({orders.length})</OrdersHeaderText>
            </OrdersHeader>
            <OrdersBottom>
                <OrdersContainer>
                    {orders.map(item => (
                        <OrdersCardContainer key={item._id}>
                        <OrdersCard>
                            <OrdersCardHeaderContainer>
                                <OrdersCardHeader>
                                    <b>Order ID: </b> {item && item._id}
                                </OrdersCardHeader>
                                <OrdersCardHeader>
                                    <b>Date: </b> {item && item.createdAt.slice(0, 10)}
                                </OrdersCardHeader>
                            </OrdersCardHeaderContainer>
                            <OrdersCardBody>
                                <OrdersCardText>
                                    <b>Total: </b> ${item && item.amount.toFixed(2)}
                                </OrdersCardText>
                                <OrdersCardText>
                                    <b>Status:</b> {item && item.status}
                                </OrdersCardText>
                                <Link to={`/order/${item && item._id}`}>
                                    <OrdersCardButton>
                                        View Order
                                    </OrdersCardButton>
                                </Link>
                            </OrdersCardBody>
                        </OrdersCard>
                    </OrdersCardContainer>
                    ))}
                </OrdersContainer>
            </OrdersBottom>
        </Wrapper>
    </Container>
    )
}

export default Orders