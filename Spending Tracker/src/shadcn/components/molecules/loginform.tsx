
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Button } from "../ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form"
import { Input } from "../ui/input"
import { auth} from "../../lib/firebase"; 
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom"
import {useStore} from '../../../store'

const passwordSchema = z.string().min(6, "Password must be at least 6 characters long"); 
const formSchema =z.object({
        email: z.string().email("Invalid email address"),
        password: passwordSchema,
      });

function LoginForm() {
  const { loggedIn, logIn} = useStore()
  const navigate = useNavigate();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
          email: "",
          password: "",
        },
      })

      async function onSubmit(values: z.infer<typeof formSchema>) {
        signInWithEmailAndPassword(auth, values.email, values.password)
        .then((userCredential) => {
        const user = userCredential.user;
        console.log(user)
        logIn()
        navigate('/')
        })
        .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage)
        navigate('/register')
        })
      }

      console.log(loggedIn)
  return (
    <main>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <h1>login Form</h1>
        <FormField
          control={form.control}
          name="email"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          
          render={({ field }) => (
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input placeholder="password" {...field} type="password"/>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </Form>
    </main>
  )
}

export default LoginForm
