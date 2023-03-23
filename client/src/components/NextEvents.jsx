import { Card } from "@nextui-org/react";

const NextEvents = () => {
  return (
    <div className="flex justify-center items-center h-full p-20 flex-col">
        <h1 className="mb-10">Our next events:</h1>
      {" "}
      <Card isHoverable variant="bordered" css={{ w: "35vw", h: "35vh" }}>
        <Card.Body>Event</Card.Body>
      </Card>
    </div>
  );
};

export default NextEvents;
