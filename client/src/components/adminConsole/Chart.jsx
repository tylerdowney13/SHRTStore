import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 60vw;
  height: 30vh;
`

const ChartTitle = styled.div`
  font-size: 25px;
`

const Chart = ({ title, data, dataKey, grid }) => {
  return (
    <Container>
      <ChartTitle>{title}</ChartTitle>
      <ResponsiveContainer width="100%" aspect={4 / 1}>
        <LineChart data={data} margin={{ top: 20, right: 10, left: 10, bottom: 0 }}>
            <XAxis dataKey="name" stroke="#5550bd" />
            <YAxis allowDecimals={false}/>
            <Line type="monotone" dataKey={dataKey} stroke="#5550bd" />
            <Tooltip />
            {grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" />}
        </LineChart>
      </ResponsiveContainer>
    </Container>
  )
}

export default Chart