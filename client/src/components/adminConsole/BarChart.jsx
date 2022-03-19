import styled from 'styled-components';
import {
    ResponsiveContainer,
    BarChart,
    CartesianGrid,
    XAxis,
    YAxis,
    Tooltip,
    Bar,
} from 'recharts';

const Container = styled.div`
    width: 90vh;
    height: 30vh;
`

const BarChartChart = ({ data }) => {

  return (
    <Container>
        { data ? (
        <ResponsiveContainer>
            <BarChart width={400} height={200} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="_id" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="total" fill=" #C3D5E2" />
            </BarChart>
        </ResponsiveContainer>
        ) : (
            <span>Loading</span>
        )
        }
    </Container>
  )
}

export default BarChartChart;