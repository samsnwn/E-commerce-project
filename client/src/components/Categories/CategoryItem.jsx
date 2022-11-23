import React from 'react'

const CategoryItem = ({item}) => {
  return (
    <div className='flex-1 m-1 h-[70vh] relative'>
        <img src={item.img} alt="" className='w-full h-full object-cover'/>
        <div className='absolute h-full w-full top-0 left-0 flex items-center justify-center flex-col'>
            <h1 className='text-white mb-4'>{item.title}</h1>
            <button className='p-4 border-none bg-white text-gray-500 font-semibold'>SHOP NOW</button>
        </div>
    </div>
  )
}

export default CategoryItem