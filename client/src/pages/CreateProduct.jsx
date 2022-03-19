import styled from 'styled-components';
import ConsoleNavbar from '../components/adminConsole/ConsoleNavbar';
import Sidebar from '../components/adminConsole/Sidebar';
import CreateProductDashboard from '../components/adminConsole/CreateProductDashboard';
const Container = styled.div`

`

const ManageProductsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const CreateProduct = () => {
  return (
    <Container>
        <ConsoleNavbar />
        <ManageProductsContainer>
          <Sidebar />
          <CreateProductDashboard />
        </ManageProductsContainer>
    </Container>
  )
}

export default CreateProduct;