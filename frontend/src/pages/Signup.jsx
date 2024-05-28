import {React, useState} from 'react'
import {Heading} from '../components/Heading'
import {SubHeading} from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'




const Signup = () => {

  const [firstName, setFirstName] = useState ("");
  const [lastName, setLastName] = useState ("");
  const [username, setUserName] = useState ("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  

  return (
   
    <div className='bg-zinc-200 h-screen flex justify-center'>
      
       
        <div className='flex flex-col justify-center '>
            <div className=' bg-white w-80 text-center border shadow-2xl  rounded-lg h-max px-4 p-2 '>
                <Heading label={"Sign up"} />
                <SubHeading label={"Enter Your information to create an account"} />
                <InputBox onChange={(e)=>{
                setFirstName(e.target.value)}}placeholder={"John"} label={"First Name"} />
                <InputBox  onChange={(e)=>{
                  setLastName(e.target.value)
                }}placeholder={"Doe"} label={"Last Name"} />
                <InputBox  onChange={(e)=>{
                setUserName(e.target.value)}}placeholder={"john@doe.com"} label={"Email"} />
                <InputBox onChange={(e)=>{
                  setPassword(e.target.value)}} placeholder={"1234567890"} label={"Password"} />
                <div className='pt-4'>
                    <Button onClick={async()=>{
                      const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                        username,
                        password,
                        firstName,
                        lastName,
                        });
                        localStorage.setItem("token", response.data.token );
                        navigate("/dashboard");
                    

                    }}  label={"Sign up"}/>
                </div>
                <BottomWarning label={"Already have an account?"} buttonText={"Sign in"}  to={"/signin"}/>

            </div>
         </div>

    </div>
    
  )
}

export default Signup