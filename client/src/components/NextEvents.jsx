import { Card } from "@nextui-org/react";

const NextEvents = () => {
  return (
    <section className="flex justify-center items-center h-full p-10 flex-col">
        <h2 className="mb-10 text-2xl">Our next events:</h2>
      {" "}
      <Card isHoverable variant="bordered" css={{ w: "50vw", h: "35vh" }}>
        <Card.Body>Event</Card.Body>
      </Card>
    </section>
  );
};

export default NextEvents;
