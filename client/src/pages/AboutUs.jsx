import React from 'react'
import { Text } from "@nextui-org/react";

const AboutUs = () => {
  return (
    <div className="h-[100vh] w-[90vw] max-w-[1200px] lg:w-[70vw] p-5 sm:p-10 flex flex-col items-center m-auto">
        <Text
        h1
        size={70}
        css={{
          textGradient: "45deg, $blue600 -20%, $pink600 50%",
        }}
        weight="bold"
      >
       Who are we?
      </Text>
      <Text
        h1
        size={70}
        css={{
          textGradient: "45deg, $purple600 -20%, $pink600 100%",
        }}
        weight="bold"
      >
        What do we do?
      </Text>
      <Text
        h1
        size={70}
        css={{
          textGradient: "45deg, $yellow600 -20%, $red600 100%",
        }}
        weight="bold"
      >
       And why do we do it?
      </Text>
        <p className="p-10 max-w-[1200px]">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Eos ex fugiat reiciendis obcaecati commodi impedit ad! Voluptatum tenetur vitae possimus ad beatae exercitationem, deleniti quaerat atque explicabo vero ex ratione illo quia aspernatur temporibus voluptatibus mollitia iure porro quibusdam. Enim expedita explicabo esse saepe, nemo, sint fuga distinctio odit voluptates dolorem animi qui tenetur corporis cumque! Soluta, quam aspernatur. Illum, eum commodi facere asperiores quae expedita error labore atque consequuntur qui odio provident facilis corrupti nihil assumenda, natus fugiat quibusdam ut aliquam. Architecto modi iste quas repellendus, laudantium eveniet, earum esse quae adipisci neque voluptas maiores vero officia nihil omnis iusto facilis molestiae alias eos ad amet minima nisi. Id nisi ut, blanditiis fugiat iusto ducimus sunt ullam repudiandae nesciunt in odit at ex eaque deleniti facere, reiciendis commodi! Tempora cumque harum deserunt amet natus beatae autem saepe possimus! Minima eum culpa velit reprehenderit nam, aperiam quidem cum obcaecati quisquam?</p>
    </div>
  )
}

export default AboutUs