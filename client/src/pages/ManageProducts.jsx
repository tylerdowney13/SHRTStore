import styled from 'styled-components';
import ConsoleNavbar from '../components/adminConsole/ConsoleNavbar';
import Sidebar from '../components/adminConsole/Sidebar';
import ManageProductsDashboard from '../components/adminConsole/ManageProductsDashboard';

const Container = styled.div`

`

const ManageProductsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const ManageProducts = () => {
  return (
    <Container>
        <ConsoleNavbar />
        <ManageProductsContainer>
          <Sidebar />
          <ManageProductsDashboard />
        </ManageProductsContainer>
    </Container>
  )
}

export default ManageProducts;