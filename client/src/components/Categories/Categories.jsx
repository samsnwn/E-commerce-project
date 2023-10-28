import { categories } from "../../assets/api/salesData";
import CategoryItem from "./CategoryItem";
import Container from "../../components/UI/Container";

const Categories = () => {
  return (
    <Container>
      <h2 className="text-center my-9  text-5xl"><b>Categories</b></h2>
      <section className="flex p-4 flex-wrap justify-between">
        {categories.map((item, index) => (
          <CategoryItem key={index} item={item} />
        ))}
      </section>
    </Container>
  );
};

export default Categories;
