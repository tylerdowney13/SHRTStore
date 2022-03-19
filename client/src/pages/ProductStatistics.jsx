import styled from 'styled-components';
import ConsoleNavbar from '../components/adminConsole/ConsoleNavbar';
import Sidebar from '../components/adminConsole/Sidebar';
import ProductsDashboard from '../components/adminConsole/StatisticsDashboard';

const Container = styled.div`

`

const ManageProductsContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const ProductStatistics = () => {
  return (
    <Container>
        <ConsoleNavbar />
        <ManageProductsContainer>
          <Sidebar />
          <ProductsDashboard />
        </ManageProductsContainer>
    </Container>
  )
}

export default ProductStatistics;