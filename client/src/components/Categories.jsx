import styled from "styled-components"
import { categories } from '../data';
import CategoryItem from "./CategoryItem";
import { mobile } from "../responsive";

const Container = styled.div`
    display: flex;
    padding: 20px;
    justify-content: space-between;

    ${mobile({
        padding: "1px",
        marginTop: "1px",
        flexDirection: "column"
    })}
`

const Categories = () => {
  return (
    <Container>
        {categories.map(item => (
            <CategoryItem item={item} key={item.id}>
                Hello
            </CategoryItem>
        ))}
    </Container>
  )
}

export default Categories