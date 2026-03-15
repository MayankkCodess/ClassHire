import { setCompanies} from '@/redux/companySlice.js'
import { COMPANY_API_END_POINT} from '@/utils/constant.js'
import axios from 'axios'
import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

//Backend - job.route.js , job.controller.js(getCompany) , check Db also 
//Frontend - Companies.jsx , CompaniesTable.jsx , redux - store & companySlice.js

const useGetAllCompanies = () => {
    const dispatch = useDispatch();
    useEffect(()=>{
        const fetchCompanies = async () => {
            try {
                const res = await axios.get(`${COMPANY_API_END_POINT}/get`,{withCredentials:true});
                if(res.data.success){
                    dispatch(setCompanies(res.data.companies));
                }
                //check does frontend error comes from backend /or does here it own 
            } catch (error) {
                console.log(error);
            }
        }
        fetchCompanies();
    },[])
}

export default useGetAllCompanies