import React from 'react'

const Appbar = () => {
  return (
    <div className='flex justify-between shadow h-14'>
        <div className='flex flex-col justify-center h-full ml-4'>
            PayTM App
        </div>
        <div className='flex'>
            <div className='flex flex-col justify-center h-full mr-4'>
                Hello
            </div>
            <div className='rounded-full h-12  bg-slate-200 flex justify-center w-12 mt-1 mr-2'>
                <div className="flex flex-col justify-center h-full text-xl cursor-pointer">
                    U
                </div>
             </div>
       </div>
        
    </div>
  )
}

export default Appbar