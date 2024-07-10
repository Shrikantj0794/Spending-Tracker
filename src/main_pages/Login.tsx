import { Link } from "react-router-dom"
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
  } from "../../src/shadcn/components/ui/card"

import LoginForm from "../shadcn/components/molecules/loginform"



function Login() {
  return (
    <main className='flex flex-col h-screen justify-center items-center'>
    <Card className='w-1/3'>
      <CardHeader>
        <CardDescription />
      </CardHeader>
      <CardContent>
            <LoginForm></LoginForm>
      </CardContent>
      <CardFooter>
        <Link to={"/register"}> <u>New Here?</u> Create an new Account</Link>
      </CardFooter>
      </Card>
    </main>
  )
}

export default Login