import {categories} from '../../assets/api/salesData'
import CategoryItem from './CategoryItem'

const Categories = () => {
  return (
    <div className="flex p-4 justify-between">
        {categories.map((item, index) => (
        <CategoryItem key={index} item={item}/>
        ))}
    </div>
  )
}

export default Categories