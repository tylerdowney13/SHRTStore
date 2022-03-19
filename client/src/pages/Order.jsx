import styled from 'styled-components';
import Navbar from '../components/Navbar';
import Announcement from '../components/Announcement';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { userRequest } from '../requestMethods';
import { mobile } from '../responsive';

const Container = styled.div`

`

const OrderContainer = styled.div`
    display: flex;
    flex-direction: column;
    padding: 20px;
`

const OrderHeaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
`

const OrderHeaderText = styled.span`
    font-size: 30px;
    margin: 5px;

    ${mobile({
        fontSize: "20px"
    })}
`

const OrderBottomContainer = styled.div`
    width: 70vw;

    ${mobile({
        width: "95%"
    })}
`

const OrderItemContainer = styled.div`
    display: flex;
    align-content: center;
    margin: 15px;
    border-bottom: 1px solid lightgrey;
    padding: 10px;

    ${mobile({
        padding: "0px"
    })}
`

const OrderItemImageContainer = styled.div`
    flex: 0.5;
`

const OrderItemImage = styled.img`
    height: 100px;
    width: 100px;
`

const OrderItemInfoContainer = styled.div`
    flex: 2;
`

const OrderItemInfoTitleContainer = styled.div`

`

const OrderItemInfoTitle = styled.span`
    font-size: 24px;
    font-weight: 600;
`

const OrderItemInfoText = styled.div`
    font-size: 18px;
`

const OrderItemInfoPrice = styled.span`
    font-size: 30px;
    font-weight: bold;

    ${mobile({
        fontSize: "16px"
    })}
`

const OrderItemAmountContainer = styled.div`
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Order = () => {
    const params = useParams("orderId");
    const orderId = params.orderid;

    const [order, setOrder] = useState([]);
    const [products, setProducts] = useState([]);
    const [loading] = useState();
    
    useEffect(() => {
        // GET order
        const getOrder = async () => {
            try {
                const orderRes = await userRequest.get(`/orders/find/orderid/${orderId}`);
                const orderData = orderRes.data;
                setOrder(orderData);
                setProducts(orderData[0].products);
            } catch (error) {
                console.log(error);
            }
        };
        orderId && getOrder();
    }, [loading, orderId]);

    return (
    <Container>
        <Navbar />
        <Announcement />
        <OrderContainer>
            <OrderHeaderContainer>
                <OrderHeaderText>
                    <b>Order ID:</b> {order[0] && order[0]._id}
                </OrderHeaderText>
                <OrderHeaderText>
                    <b>Date:</b> {order[0] && order[0].createdAt.slice(0, 10)}
                </OrderHeaderText>
                <OrderHeaderText>
                    <b>Status:</b> {order[0] && order[0].status}
                </OrderHeaderText>
                <OrderHeaderText>
                    <b>Order:</b>
                </OrderHeaderText>
            </OrderHeaderContainer>
            <OrderBottomContainer>
                {products.map(item => (
                    <OrderItemContainer key={item.title}>
                    <OrderItemImageContainer>
                    <OrderItemImage src={item && item.img}/>
                    </OrderItemImageContainer>
                    <OrderItemInfoContainer>
                        <OrderItemInfoTitleContainer>
                            <OrderItemInfoTitle>
                                {item.title}
                            </OrderItemInfoTitle>
                            <OrderItemInfoText>
                                <b>Price: </b> ${item.price.toFixed(2)}
                            </OrderItemInfoText>
                            <OrderItemInfoText>
                                <b>Quantity: </b> {item.quantity}
                            </OrderItemInfoText>
                            <OrderItemInfoText>
                                <b>Description: </b> {item.desc}
                            </OrderItemInfoText>
                        </OrderItemInfoTitleContainer>
                        </OrderItemInfoContainer>
                        <OrderItemAmountContainer>
                            <OrderItemInfoPrice>
                                ${(item.quantity *  item.price).toFixed(2)}
                            </OrderItemInfoPrice>
                        </OrderItemAmountContainer>
                    </OrderItemContainer>
                    ))}
                <OrderHeaderText>
                    <b>Total:</b> ${order[0] && order[0].amount.toFixed(2)}
                </OrderHeaderText>
            </OrderBottomContainer>
        </OrderContainer>
    </Container>
    )
}

export default Order