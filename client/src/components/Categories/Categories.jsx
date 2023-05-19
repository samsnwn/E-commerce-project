import { categories } from "../../assets/api/salesData";
import CategoryItem from "./CategoryItem";
import Container from "../../components/UI/Container";

const Categories = () => {
  return (
    <Container>
      <div className="flex p-4 justify-between">
        {categories.map((item, index) => (
          <CategoryItem key={index} item={item} />
        ))}
      </div>
    </Container>
  );
};

export default Categories;
