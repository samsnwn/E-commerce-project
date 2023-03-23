import { Card } from "@nextui-org/react";
import NextEvents from "../../components/NextEvents";

const Events = () => {
  return (<>
  <NextEvents/>
    <div>
      <h1 className="text-center mt-10">Our previous events:</h1>
    <div className="h-full w-full flex justify-center items-center flex-wrap gap-5 p-10">
      {" "}
      <a href="/events/event1">
        <Card isHoverable variant="bordered" css={{ w: "35vw", h: "35vh" }}>
          <Card.Body>Event</Card.Body>
        </Card>
      </a>
      <a href="/events/event2">
        <Card isHoverable variant="bordered" css={{ w: "35vw", h: "35vh" }}>
          <Card.Body>Event</Card.Body>
        </Card>
      </a>
      <a href="/events/event3">
        <Card isHoverable variant="bordered" css={{ w: "35vw", h: "35vh" }}>
          <Card.Body>Event</Card.Body>
        </Card>
      </a>
      <a href="/events/event4">
        <Card isHoverable variant="bordered" css={{ w: "35vw", h: "35vh" }}>
          <Card.Body>Event</Card.Body>
        </Card>
      </a>
    </div>
    </div>
    </>
  );
};

export default Events;
