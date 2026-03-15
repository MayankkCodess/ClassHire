// redux-toolkit helps us as we dont have to create actions from scratch - {type:'ADD_TODO' , payload:"write code",}
// there are too much information inside actions - which we say payload - like(many info inside events - target info , kis type ka event,etc)

//this createSlice helps us in making bundle of actions and reducers for our feature
import {createSlice} from "@reduxjs/toolkit";


// now we create first a object named initialState jo define krta hai ki hamari slice ke andar state variables ki initial state kya hogi
// so now our second work is to pass options in createSlice fn , to write both action & reducers and then export this slice to use in components
const authSlice = createSlice({
    //Imp line - so jo state variables ham ynha pr define kr rahe ho (like loading , user) woh phle store ke aandar pass krenge (using auth:authSlice), aur phir store ko koi bhi use kr payega using these reducers(like store.auth , store.job)
    name:"auth",// we have to give name to our slice , so give me same as feature name

    initialState:{//you can create this object outside also , and just past the variable name here but okk it is also correct
        loading:false,
        user:null
    },
    reducers:{
        //reducer is just event handler - that kaaam/actions hogyaa abb usko handle karlo , it is a object of functions
        //reducer have two things state,actions - so inke pass initial state ka access hota hai 
        setLoading:(state,action) =>{
            //we have to assume that action ynha pr aagaya hoga 
            state.loading = action.payload;
        },
        setUser:(state,action) =>{
            state.user = action.payload;
        }
    }
})
// Redux toolkit automatically generates actions creators 
export const {setLoading,setUser} =authSlice.actions;
export default authSlice.reducer;