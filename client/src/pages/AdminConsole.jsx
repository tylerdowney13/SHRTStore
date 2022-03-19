import styled from 'styled-components';
import ConsoleNavbar from '../components/adminConsole/ConsoleNavbar';
import Sidebar from '../components/adminConsole/Sidebar';
import Dashboard from '../components/adminConsole/Dashboard';

const Container = styled.div`

`

const AdminConsoleContainer = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
`

const AdminConsole = () => {
  return (
    <Container>
        <ConsoleNavbar />
        <AdminConsoleContainer>
          <Sidebar />
          <Dashboard />
        </AdminConsoleContainer>
    </Container>
  )
}

export default AdminConsole;