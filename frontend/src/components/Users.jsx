import React, { useEffect } from 'react'
import { Button } from './Button'
import {useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


export const Users =()=>{
    const [users,setUsers] = useState([]);
    const [filter, setFilter] = useState("");
    useEffect(()=>{
    axios.get("http://localhost:3000/api/v1/user/bulk?filter=" + filter )
        .then(response =>{
            setUsers(response.data.user);
        },[filter])
    })

 

    return <>
    <div className='font-bold text-lg mt-6'>
        Users
    </div>
    <div className='my-2'>
        <input type="text" placeholder='Search users' onChange={(e)=>{
            setFilter(e.target.value)
        }}  className='w-full px-2 py-1 border rounded border-slate-200 '/>
    </div>
    <div>
        {users.map((user)=> <User user={user} />)}
    </div>
    
    </>
}

const User = ({user}) => {
    const navigate = useNavigate();
  return (
    
        <div className='flex justify-between'>
            <div className='flex'>
                <div className='bg-slate-300 w-12 text-center rounded-full mt-1 mr-2 justify-center'>
                   <div className='flex flex-col h-full  text-xl justify-center'>
                    {user.firstName[0]}
                    </div> 
                </div>
                <div className='flex items-center'>
                    <div>
                        {user.firstName} {user.lastName}
                    </div>
                </div>
            </div>
        
            <div className='flex flex-col justify-center h-full'>
                <Button  onClick={(e)=>{ navigate("/send?id=" +user._id +"&name=" + user.firstName)}}
                    label={"Send Money"} />
            </div>
        </div>
  
  )
}

export default Users