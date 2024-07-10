import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
  } from "../../src/shadcn/components/ui/card"

import RegistrationForm from "../shadcn/components/molecules/registration"
function Register() {
  return (
    <main className='flex flex-col h-screen justify-center items-center'>
    <Card className='w-1/3'>
      <CardHeader>
        <CardDescription />
      </CardHeader>
      <CardContent>
            <RegistrationForm></RegistrationForm>
      </CardContent>
      </Card>
    </main>
  )
}

export default Register
