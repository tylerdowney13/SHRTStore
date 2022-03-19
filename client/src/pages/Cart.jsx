import { Add, Remove } from '@material-ui/icons';
import styled from 'styled-components';
import Announcement from '../components/Announcement';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import Newsletter from '../components/Newsletter';
import { mobile } from '../responsive';
import { useSelector } from 'react-redux';
import StripeCheckout from 'react-stripe-checkout';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { userRequest } from '../requestMethods';
import { emptyCart } from '../redux/cartRedux';
import { useDispatch } from 'react-redux';

const KEY = process.env.REACT_APP_STRIPE;

const Container = styled.div`

`

const Wrapper = styled.div`
    padding: 20px;

    ${mobile({
        padding: "10px"
    })}
`

const Title = styled.h1`
    font-weight: 300;
    text-align: center;
`

const Top = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 20px;
`

const TopButton = styled.button`
    padding: 10px;
    font-weight: 600;
    cursor: pointer;
    border: ${props => props.type === "filled" && "none"};
    background-color: ${props => props.type === "filled" ? "black" : "transparent"};
    color: ${props => props.type === "filled" && "white"};
`

const TopTexts = styled.div`
    ${mobile({
            display: "none"
        })}

`

const TopText = styled.span`
    text-decoration: underline;
    cursor: pointer;
    margin: 0 10px;
`

const Bottom = styled.div`
    display: flex;
    justify-content: space-between;

    ${mobile({
        flexDirection: "column"
    })}
`

const Info = styled.div`
    flex: 3;
`

const Product = styled.div`
    display: flex;
    justify-content: space-between;

    ${mobile({
        flexDirection: "column"
    })}
`
const ProductDetail = styled.div`
    flex: 2;
    display: flex;
`

const Image = styled.img`
    width: 200px;
`

const Details = styled.div`
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
`

const ProductName = styled.div`

`

const ProductId = styled.div`

`

const ProductColor = styled.div`
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background-color: ${props => props.color};
`

const ProductSize = styled.div`

`

const PriceDetail = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const ProductAmountContainer = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 20px;

       ${mobile({
        margin: "10px"
    })}
`

const ProductAmount = styled.div`
    font-size: 24px;
    margin: 5px;

    ${mobile({
        margin: "10px"
    })}
`

const ProductPrice = styled.div`
    font-size: 30px;
    font-weight: 300;

    ${mobile({
        marginBottom: "10px"
    })}
`
const Hr = styled.hr`
    background-color: #eee;
    border: none;
    height: 1px;
`

const Summary = styled.div`
    flex: 1;
    border: 1px solid lightgray;
    border-radius: 10px;
    padding: 20px;
    height: 50vh;
`

const SummaryTitle = styled.h1`
    font-weight: 200;
`

const SummaryItem = styled.div`
    margin: 30px 0;
    display: flex;
    justify-content: space-between;
    font-weight: ${props => props.type === "total" && "500"};
    font-size: ${props => props.type === "total" && "24px"};
`

const SummaryItemText = styled.span`

`

const SummaryItemPrice = styled.span`

`

const SummaryButton = styled.button`
    width: 100%;
    padding: 10px;
    background-color: black;
    color: white;
    font-weight: 600;
    cursor: pointer;
`

const TestCardNumberContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    padding-top: 5px;
`

const Cart = () => {
    const cart = useSelector(state => state.cart);
    const user = useSelector(state => state.user);

    const [stripeToken, setStripeToken] = useState(null);

    const navigate = useNavigate();

    const dispatch = useDispatch();

    const onToken = (token) => {
        setStripeToken(token);
    }

    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res = await userRequest.post("/checkout/payment", {
                    tokenId: stripeToken.id,
                    amount: cart.total * 100,
                });

                console.log(cart.products);
                
                const order = {
                    userId: user.currentUser._id,
                    products: cart.products,
                    amount: cart.total,
                    address: res.data.billing_details.address,
                }

                const orderRes = await userRequest.post("/orders", order);
                console.log(orderRes);
                dispatch(emptyCart());

                const allProducts = cart.products;
                allProducts.forEach(async (productData) => {
                    const product = {
                        productId: productData._id,
                        quantity: productData.quantity,
                        title: productData.title,
                    }
                    await userRequest.post("/productSales", product);
                });
                // navigate("/");
            } catch (error) {
                console.log(error)
            }
        };
        stripeToken?.id && cart.total >= 1 && makeRequest();
    }, [stripeToken, cart.total, navigate, dispatch, cart.products, user.currentUser._id])

  return (
    <Container>
        <Navbar />
        <Announcement />
        <Wrapper>
            <Title>CART</Title>
            <Top>
                <Link to="/">
                    <TopButton>Continue Shopping</TopButton>
                </Link>
                <TopTexts>
                    <TopText>Shopping Bag (2)</TopText>
                    <TopText>Wishlist</TopText>
                </TopTexts>
                <TopButton type="filled" disabled={true}>Checkout Now</TopButton>
            </Top>
            <Bottom>
                <Info>
                    {cart.products.map(product => (
                        <Product key={product._id}>
                            <ProductDetail>
                                <Image src={product.img} />
                                <Details>
                                    <ProductName><b>Product:</b> {product.title}</ProductName>
                                    <ProductId><b>ID:</b> {product._id}</ProductId>
                                    <ProductSize><b>Size:</b> {product.size}</ProductSize>
                                    <ProductColor color={product.color} />
                                </Details>
                            </ProductDetail>
                            <PriceDetail>
                                <ProductAmountContainer>
                                    <Add />
                                    <ProductAmount>{product.quantity}</ProductAmount>
                                    <Remove />
                                </ProductAmountContainer>
                                <ProductPrice>${product.price * product.quantity}</ProductPrice>
                            </PriceDetail>
                        </Product>
                    ))}
                    <Hr />
                </Info>
                <Summary>
                    <SummaryTitle>ORDER SUMMARY</SummaryTitle>
                    <SummaryItem>
                        <SummaryItemText><b>Subtotal:</b> </SummaryItemText>
                        <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText><b>Estimated Shipping:</b> </SummaryItemText>
                        <SummaryItemPrice>$5.00</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem>
                        <SummaryItemText><b>Shipping Discount:</b> </SummaryItemText>
                        <SummaryItemPrice>- $5.00</SummaryItemPrice>
                    </SummaryItem>
                    <SummaryItem type="total">
                        <SummaryItemText><b>Total:</b> </SummaryItemText>
                        <SummaryItemPrice>${cart.total}</SummaryItemPrice>
                    </SummaryItem>
                    <StripeCheckout 
                        name="SHRT"
                        image="https://firebasestorage.googleapis.com/v0/b/shop-f2cb2.appspot.com/o/shrtlogo.jpg?alt=media&token=b59aedfd-e820-48ab-a7a1-1fcaf86e5338"
                        billingAddress
                        shippingAddress
                        description={`Your total is $${cart.total}`}
                        amount={cart.total * 100}
                        token={onToken}
                        stripeKey={KEY}
                        >
                        <SummaryButton>CHECKOUT</SummaryButton>
                        <TestCardNumberContainer>
                            <span>Test Card Number = 4242 4242 4242 4242</span>
                        </TestCardNumberContainer>
                    </StripeCheckout>
                </Summary>
            </Bottom>
        </Wrapper>
        <Newsletter />
        <Footer />
    </Container>
  )
}

export default Cart