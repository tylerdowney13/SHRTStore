import styled from 'styled-components';
import { useEffect, useState } from 'react';
import { userRequest } from '../../requestMethods';
import BarChartChart from './BarChart';

const Container = styled.div`
    border: 1px solid lightgrey;
    width: calc(100vw - 460px);
    min-width: 250px;
    display: flex;
    flex-direction: column;
`

const ConsoleTitleContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 250px;
    padding-top: 10px;
`

const ConsoleTitle = styled.span`
    font-size: 40px;
    font-weight: 30px;
`

const DashboardContainer = styled.div`
    margin: 10px;
    min-width: 400px;
`

const DashboardBottomContainer = styled.div`
    display: flex; 
    flex-direction: column;
    justify-content: center;
    align-items: center;

`

const DashboardMainGraphContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
`

const StatisticsDashboard = () => {
    const [loading] = useState(false);
    const [popularProductsInfo, setPopularProductsInfo] = useState([]);

  useEffect(() => {
    const getPopularProducts = async () => {
        const popularProductsRes = await userRequest.get("/productSales/stats");
        const popularProductsData = popularProductsRes;
        const popularProductsSlice = popularProductsData.data.slice(0, 5);
        setPopularProductsInfo(popularProductsSlice);
    };
    getPopularProducts();
  }, [loading]);

  return (
    <Container>
        <ConsoleTitleContainer>
            <ConsoleTitle>
                Popular Products
            </ConsoleTitle>
        </ConsoleTitleContainer>
        <DashboardContainer>
        <DashboardBottomContainer>
            <DashboardMainGraphContainer>
                {
                    popularProductsInfo &&
                        <BarChartChart data={popularProductsInfo} />
                }
            </DashboardMainGraphContainer>
        </DashboardBottomContainer>
        </DashboardContainer>
    </Container>
  )
}

export default StatisticsDashboard;