import styled from 'styled-components';
import { ShoppingBasket, Add, Equalizer } from '@material-ui/icons';
import { Link } from 'react-router-dom';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    width: 250px;
    background-color: #C3D5E2;
    height: calc(100vh - 60px);
`

const TitleContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 5px;
    margin-top: 10px;
`

const TitleSpan = styled.div`
    font-size: 20px;
    font-weight: 700;
`

const TitleHr = styled.hr`
    color: white;
    width: 99%;
`



const MenuTitleContainer = styled.div`
    display: flex;
    margin: 5px;
    margin-top: 10px;
`

const MenuTitleSpan = styled.div`
    font-size: 20px;
    font-weight: 700;
`

const MenuItemsContainer = styled.div`
    display: flex;
    flex-direction: column;
`

const MenuItemContainer = styled.div`
    display: flex; 
    margin: 5px 15px;
    align-items: center;
`

const MenuItemIconContainer = styled.div`
    margin-right: 10px;
`

const MenuItemTextContainer = styled.div`
    cursor: pointer;
`

const MenuItemText = styled.div`
    font-size: 20px;
    font-weight: 600;

    &:hover {
        font-weight: 700;
    }
`



const Sidebar = () => {
  return (
    <Container>
        <TitleContainer>
            <Link to="/admin" style={{textDecoration: "none", color: "black"}}>
                <TitleSpan>Admin Console</TitleSpan>
            </Link>
        </TitleContainer>
        <TitleHr />
        <MenuTitleContainer>
            <MenuTitleSpan>Inventory</MenuTitleSpan>
        </MenuTitleContainer>
        <MenuItemsContainer>
            <MenuItemContainer>
                <MenuItemIconContainer>
                    <ShoppingBasket style={{fontSize: "30px"}}/>
                </MenuItemIconContainer>
                <MenuItemTextContainer>
                    <Link to="/admin/manageproducts" style={{textDecoration: "none", color: "black"}}>
                        <MenuItemText>Manage Products</MenuItemText>
                    </Link>
                </MenuItemTextContainer>
            </MenuItemContainer>
            <MenuItemContainer>
                <MenuItemIconContainer>
                    <Add style={{fontSize: "30px"}}/>
                </MenuItemIconContainer>
                <MenuItemTextContainer>
                    <Link to="/admin/createproduct" style={{textDecoration: "none", color: "black"}}>
                        <MenuItemText>Create Product</MenuItemText>
                    </Link>
                </MenuItemTextContainer>
            </MenuItemContainer>
            <MenuItemContainer>
                <MenuItemIconContainer>
                    <Equalizer style={{fontSize: "30px"}}/>
                </MenuItemIconContainer>
                <MenuItemTextContainer>
                    <Link to="/admin/statistics" style={{textDecoration: "none", color: "black"}}>
                        <MenuItemText>Statistics</MenuItemText>
                    </Link>
                </MenuItemTextContainer>
            </MenuItemContainer>
        </MenuItemsContainer>
    </Container>
  )
}

export default Sidebar