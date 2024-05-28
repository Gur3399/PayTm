import {Heading} from '../components/Heading'
import {SubHeading} from '../components/SubHeading'
import { InputBox } from '../components/InputBox'
import { Button } from '../components/Button'
import { BottomWarning } from '../components/BottomWarning'

const Signin = () => {
  return (
    <div className='bg-slate-300 flex justify-center h-screen'>
        <div className='flex flex-col justify-center'>
            <div className='rounded-lg bg-white w-80 text-center p-2 h-max px-4'>
                <Heading label={"Sign in"} />
                <SubHeading label={"Sign in to your account"} />
                <InputBox label={"Email"} placeholder={"gurjotca3399@gmail.com"}/>
                <InputBox label={"Password"} placeholder={"**********"}/>
                <div className='pt-4'>
                    <Button label={"Sign in"} />
                </div>
           <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}/>

           </div>
        </div>    
    </div>
  )
}

export default Signin