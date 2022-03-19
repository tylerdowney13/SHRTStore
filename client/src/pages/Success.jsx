import { useLocation } from "react-router-dom"
import styled from 'styled-components';
import Navbar from "../components/Navbar";

const Container = styled.div`

`

const Success = () => {
    const location = useLocation();

    console.log(location);
  return (
    <Container>
      <Navbar />
    </Container>
  )
}

export default Success