import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { db, auth } from "../../lib/firebase";
import { collection, addDoc } from "firebase/firestore";
import { DialogClose } from "@radix-ui/react-dialog";

const re = new RegExp("^[0-9]+$");

const formSchema = z.object({
  title: z.string().min(2, "minimum 2 char required"),
  description: z.string().optional(),
  amount: z.string().regex(re, "Enter Numbers only"),
  transactionType: z.string(),
});

interface TransactionFormProps {
  onTransactionAdded: () => void;
}

function TransactionForm({ onTransactionAdded }: TransactionFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      amount: "",
      transactionType: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      // Add a new document with a generated id.
      const docRef = await addDoc(collection(db, "Transactions"), {
        uid: auth.currentUser?.uid,
        title: values.title,
        description: values.description,
        amount: values.amount,
        transactionType: values.transactionType,
      });

      console.log(values, docRef);
      // Call the callback function to refresh data
      onTransactionAdded();
    } catch (error) {
      console.error("Error adding transaction:", error);
    }
  }

  return (
    <>
      <main>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <h1>Registration Form</h1>
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Expense Title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input placeholder="description" {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="amount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Amount</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Amount " {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="transactionType"
              render={({ field }) => (
                <FormItem className="space-y-3">
                  <FormLabel>Transaction Type</FormLabel>
                  <FormControl>
                    <RadioGroup
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                      className="flex flex-col space-y-1"
                    >
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Income" />
                        </FormControl>
                        <FormLabel className="font-normal">Income</FormLabel>
                      </FormItem>
                      <FormItem className="flex items-center space-x-3 space-y-0">
                        <FormControl>
                          <RadioGroupItem value="Expense" />
                        </FormControl>
                        <FormLabel className="font-normal">Expense</FormLabel>
                      </FormItem>
                    </RadioGroup>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogClose asChild>
              <Button type="submit" className="w-full">
                Submit
              </Button>
            </DialogClose>
          </form>
        </Form>
      </main>
    </>
  );
}

export default TransactionForm;
