import React from 'react'
import SendIcon from '@mui/icons-material/Send';

const Newsletter = () => {
  return (
    <div className="h-[60vh] bg-[#fde5e5] flex items-center justify-center flex-col">
      <h1 className="text-5xl mb-3">Newsletter</h1>
      <div className="text-lg font-light">Get timely updates from your favourite products.</div>
      <div className="w-[50%] h-[40px] bg-white flex justify-between border border-gray-300">
        <input  className="border-none flex-[8] pl-3" type="email" placeholder="Your email"/>
        <button className="flex items-center justify-center flex-1 bg-teal-700 text-white"><SendIcon/></button>
      </div>
    </div>
  )
}

export default Newsletter