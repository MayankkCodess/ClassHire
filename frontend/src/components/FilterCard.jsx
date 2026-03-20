import React,{useEffect,useState} from 'react'
import {Label} from './ui/label.jsx'
import {RadioGroup,RadioGroupItem} from "./ui/radio-group.jsx"
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice.js'


//Very Important for knowledge of nested array .map method of array 
//interesting concept of radio group and then creating connection between label & radiogroup 
// also takes quick recap of this useEffect , and dependency array 

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
    const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
    return (
        <div className='w-full bg-white p-5 rounded-md'>
            <h1 className='font-bold text-xl'>Filter Jobs</h1>
            <hr className='mt-1 mb-3' />
            <RadioGroup value={selectedValue} onValueChange={changeHandler}>
                {
                    filterData.map((data, index) => (
                        <div>
                            <h1 className='font-bold text-[#696B71] text-lg'>{data.filterType}</h1>
                            {
                                data.array.map((item, idx) => {
                                    const itemId = `id${index}-${idx}`
                                    return (
                                        <div className='flex items-center space-x-2 my-2'>
                                            <RadioGroupItem value={item} id={itemId} />
                                            <Label className="hover:text-[#B3BBC6]" htmlFor={itemId}>{item}</Label>
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

export default FilterCard;