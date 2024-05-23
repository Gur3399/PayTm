import React from 'react'
import { Button } from './Button'
import {useState} from 'react'

export const Users =()=>{
    const [users,setUsers] = useState([{
        firstName:"Gurjot",
        lastName:"Singh",
        _id:1
    }]);

    return <>
    <div className='font-bold text-lg mt-6'>
        Users
    </div>
    <div className='my-2'>
        <input type="text" placeholder='Search users'  className='w-full px-2 py-1 border rounded border-slate-200 '/>
    </div>
    <div>
        {users.map((user)=> <User user={user} />)}
    </div>
    
    </>
}

const User = ({user}) => {
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
                <Button label={"Send Money"} />
            </div>
        </div>
  
  )
}

export default Users