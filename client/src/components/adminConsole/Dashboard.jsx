import styled from 'styled-components';
import Chart from './Chart';
import { useEffect, useState, useMemo } from 'react';
import { userRequest } from '../../requestMethods';
import { ArrowUpward, ArrowDownward, PersonAdd } from '@material-ui/icons';

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

const DashboardHeaderContainer = styled.div`
    display: flex;
    justify-content: space-evenly;
`

const CardContainer = styled.div`
    display: flex;
    margin: 15px;
    justify-content: space-evenly;
`

const Card = styled.div`
    display: flex;
    flex-direction: column;
    min-width: 10vh;
    min-height: 10vh;
    width: 20vw;
    height: 10vw;
    border-radius: 10px;
    background-color: #C3D5E2;
`

const CardTop = styled.div`
    flex: 1;
    margin: 5px 0px 0px 10px;
`

const CardDescription = styled.div`
    font-size: 30px;
    font-weight: 500;
`

const CardBottom = styled.div`
    flex: 3;
    justify-content: center;
    align-items: center;
    margin: 0px 0px 10px 10px;
`

const TextContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const TextLarge = styled.span`
    font-size: 60px;
    font-weight: 400;
`
const PercentageContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

const TextSmall = styled.span`
    font-size: 30px;
    font-weight: 300;
`

const IconContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-left: 10px;
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

const Dashboard = () => {
    const [income, setIncome] = useState(0);
    const [incomeData, setIncomeData] = useState([]);
    const [percentage, setPercentage] = useState(0);
    const [userStats, setUserStats] = useState([]);
    const [userPercentage, setUserPercentage] = useState(0);
    const [productSalesStatistics, setProductSalesStatistics] = useState([]);
    const [loading] = useState(false);

      const months = useMemo(() => [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ], []);

 

  useEffect(() => {
    const getStats = async () => {
      try {
        setUserStats([]);
        const res = await userRequest.get("/user/stats");
        res.data.sort((a, b) => a._id - b._id);
        res.data.map(item => (
          setUserStats(prev => [
            ...prev,
            {name: months[item._id - 1], "active": item.total},
          ], setUserPercentage(((res.data[0].total * 100)/ res.data[1].total).toFixed(2)))
        ));
        
      } catch (error) {
        console.log(error);
      }
    };
    getStats();
  }, [months, loading]);

    useEffect(() => {
    const getIncome = async () => {
      try {
        const res = await userRequest.get("orders/income");
        res.data.map(item => (
          setIncomeData(prev => [
            ...prev,
            {name: months[item._id - 1], "total": item.total}])))
        setIncome(res.data[0].total)
        setPercentage(((res.data[0].total * 100)/ res.data[1].total).toFixed(2));
      } catch (error) {
        console.log(error);
      }
    };
    getIncome();
  }, [loading, months]);

  useEffect(() => {
    const getProductSalesStats = async () => {
        try {
            const res = await userRequest.get("/productSales/stats");
            setProductSalesStatistics(res.data);
        } catch (error) {
            console.log(error);
            window.location.reload();
        }
    };
    getProductSalesStats();
  }, [loading])

  return (
    <Container>
        <ConsoleTitleContainer>
            <ConsoleTitle>
                Dashboard
            </ConsoleTitle>
        </ConsoleTitleContainer>
        <DashboardContainer>
            <DashboardHeaderContainer>
                <CardContainer>
                    <Card>
                        <CardTop>
                            <CardDescription>
                                Sales
                            </CardDescription>
                        </CardTop>
                        <CardBottom>
                            <TextContainer>
                                <TextLarge>${income}</TextLarge>
                            </TextContainer>
                            <PercentageContainer>
                                <TextContainer>
                                    <TextSmall>{percentage}%</TextSmall>
                                </TextContainer>
                                <IconContainer>
                                    {percentage < 0 ? (<ArrowDownward style={{color: "red", fontSize: "30px"}}/>) : (<ArrowUpward style={{color: "green", fontSize: "30px"}}/>) }
                                </IconContainer>
                            </PercentageContainer>
                        </CardBottom>
                    </Card>
                </CardContainer>
                <CardContainer>
                    <Card>
                        <CardTop>
                            <CardDescription>
                                New Users
                            </CardDescription>
                        </CardTop>
                        <CardBottom>
                            <TextContainer>
                                <IconContainer>
                                    <PersonAdd style={{marginRight: "10px", fontSize: "60px"}} />
                                </IconContainer>
                                <TextLarge>{userStats[0]?.active}</TextLarge>
                            </TextContainer>
                            <PercentageContainer>
                                <TextContainer>
                                    <TextSmall>{userPercentage}%</TextSmall>
                                </TextContainer>
                                <IconContainer>
                                    {userPercentage < 0 ? (<ArrowDownward style={{color: "red", fontSize: "30px"}}/>) : (<ArrowUpward style={{color: "green", fontSize: "30px"}}/>) }
                                </IconContainer>
                            </PercentageContainer>
                        </CardBottom>
                    </Card>
                </CardContainer>
                <CardContainer>
                    <Card>
                        <CardTop>
                            <CardDescription>
                                Best Seller
                            </CardDescription>
                        </CardTop>
                        <CardBottom>
                            <TextContainer>
                                <TextSmall>{productSalesStatistics[0]?._id ? productSalesStatistics[0]._id : "loading"}</TextSmall>
                            </TextContainer>
                            <TextContainer>
                                <TextSmall>Units Sold: {productSalesStatistics[0]?.total ? productSalesStatistics[0].total : "loading"}</TextSmall>
                            </TextContainer>
                        </CardBottom>
                    </Card>
                </CardContainer>
            </DashboardHeaderContainer>
        <DashboardBottomContainer>
            <DashboardMainGraphContainer>
                <Chart data={userStats} title="User Analytics" grid dataKey="active"/>
            </DashboardMainGraphContainer>
            <DashboardMainGraphContainer>
                <Chart data={incomeData.sort((a, b) => a.total - b.total)} title="Sales Analytics" grid dataKey="total"/>
            </DashboardMainGraphContainer>
        </DashboardBottomContainer>
        </DashboardContainer>
    </Container>
  )
}

export default Dashboard;