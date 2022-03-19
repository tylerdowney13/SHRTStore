import styled from 'styled-components';
import ConsoleNavbar from '../components/adminConsole/ConsoleNavbar';
import Sidebar from '../components/adminConsole/Sidebar';
import EditProductDashboard from '../components/adminConsole/EditProductDashboard';

const Container = styled.div`

`

const ManageProductsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const EditProduct = () => {
  return (
    <Container>
        <ConsoleNavbar />
        <ManageProductsContainer>
          <Sidebar />
          <EditProductDashboard />
        </ManageProductsContainer>
    </Container>
  )
}

export default EditProduct;