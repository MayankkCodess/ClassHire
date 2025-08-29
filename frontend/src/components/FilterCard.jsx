import React from 'react'
import {Label} from './ui/label.jsx'
import {RadioGroup,RadioGroupItem} from "./ui/radio-group.jsx"
const filterData = [
    {
        filterType:"Location",
        array:["Delhi NCR" , "Bangalore" , "Hyderabad" , "Pune" , "Mumbai"]
    },
    {
        filterType:"Industry",
        array:["Frontend Developer" , "Backend Developer" , "FullStack Developer" , "Django Developer" , "Java Developer"]
    },
    {
        filterType:"Salary",
        array:["0-40k" , "40k-1lakh" , "1lakh to 5lakh"]
    }
]

const FilterCard = () => {
  return (
    <div className='w-full bg-white p-3 rounded-md '>
      <h1 className='font-bold text-lg'>Filter Jobs</h1>
      <hr  className='my-3'/>
      <RadioGroup>
        {
            filterData.map((data,index) => (
                <div>
                    <h1 className='font-bold text-lg'>{data.filterType}</h1>
                    {
                        data.array.map((item,index)=>{
                            return (
                                <div className='flex items-center space-x-2 my-2'>
                                    <RadioGroupItem value={item}/>
                                    <Label>{item}</Label>
                                </div>
                            )
                        })
                    }
                </div>
            ))
        }
      </RadioGroup>
    </div>
  )
}

export default FilterCard
