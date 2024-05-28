import axios from 'axios';
import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom'

const SendMoney = () => {
    const [parms] =  useSearchParams();
    const [amount, setAmount] = useState();

    const to = parms.get('id');

  return (
    <div className='bg-gray-100 h-screen flex justify-center'>
        <div className='flex flex-col justify-center h-full'>
            <div className=' border h-min max-w-md  p-4 space-y-8 w-96 rounded-lg flex flex-col justify-center bg-white shadow-lg'>
                <div className='flex justify-center p-6'>
                    <h3 className='text-3xl font-bold text-center'>Send Money</h3>
                </div>

                <div className='p-6'>
                    <div className='flex items-center space-x-4 pb-2'>
                        <div className=' text-white bg-green-500 rounded-full w-12 h-12 flex justify-center items-center'>
                            <span className='text-2xl'>{parms.get('name').charAt(0)}</span>
                        </div>
                        <h2 className='text-2xl font-semibold'>{parms.get('name')}</h2>
                    </div>
                    <div className='space-y-4 '>
                        <div class='space-y-2'>
                            <label for="amount" className='flex text-sm font-bold loading-none '>Amount (in Rs)</label>
                            <input onChange ={(e)=>{setAmount(e.target.value)}} type="text" placeholder='Enter Amount' className='flex rounded-md h-10 w-full px-3 py-2 text-sm border' id='amount'/>
                        </div>
                    <button onClick={()=>{
                        axios.post("http://localhost:3000/api/v1/account/transfer",{
                            to: to,
                            amount
                        },{
                            headers: {Authorization:"Bearer "+ localStorage.getItem('token')}
                        })
                    }} className='justify-center rounded-md  bg-green-500 font-medium text-white w-full  h-10 ring-offset-black '>Initiate Transfer</button>
                    </div>
                </div>

                
            </div>
        </div>
    </div>
  )
}

export default SendMoney