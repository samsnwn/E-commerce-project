import Message from "../../components/UI/Message";
import Loader from "../../components/UI/Loader";
import { Table } from "@nextui-org/react";
import { useGetProductsQuery } from "../../redux/productsApiSlice";

const ProductListScreen = () => {
  const { data: products, isLoading, error } = useGetProductsQuery()

  return (
    <>
    {isLoading ? (
      <Loader />
    ) : error ? (
      <Message variant="danger">{error}</Message>
    ) : (
      <>
        <Table
          aria-label="Example table with static content"
          css={{
            height: "auto",
            minWidth: "100%",
          }}
        >
          <Table.Header>
            <Table.Column>ID</Table.Column>
            <Table.Column>TITLE</Table.Column>
            <Table.Column>PRICE</Table.Column>
          </Table.Header>
          <Table.Body>
            {products.products && products.products.map((product) => (
              <Table.Row key={product._id}>
                <Table.Cell>{product.rn}</Table.Cell>
                <Table.Cell>{product.title}</Table.Cell>
                <Table.Cell>{product.price }</Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </>
    )}
  </>
  )
}

export default ProductListScreen