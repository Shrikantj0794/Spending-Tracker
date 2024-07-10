import { Button } from "../shadcn/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../shadcn/components/ui/dialog";
import TransactionForm from "../shadcn/components/molecules/transactionform";
import { signOut } from "firebase/auth";
import { auth, db } from "../shadcn/lib/firebase";
import { useNavigate } from "react-router-dom";
import { collection, getDocs, where, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { DataTable } from "../shadcn/components/ui/transactionDataTable";
import { columns } from "../shadcn/components/ui/transactioncolumn";
import { useStore } from '../store'

const Home = () => {
  const { loggedIn, logOut } = useStore();
  const navigate = useNavigate();
  const [transactionList, setTransactionList] = useState([]);

  async function signout() {
    signOut(auth).then(() => {
      logOut();
      navigate("/login");
    });
  }

  const getData = async () => {
    try {
      const q = query(collection(db, "Transactions"), where("uid", "==", auth.currentUser?.uid));

      const querySnapshot = await getDocs(q);
      let list: any = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setTransactionList(list);
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };

  useEffect(() => {
    if (!loggedIn) {
      navigate("/login");
    } else {
      getData();
    }
  }, [loggedIn, navigate]);

  useEffect(() => {
    console.log("Updated transactionList:", transactionList);
  }, [transactionList]);

  return (
    <>
      <h1>Expense Tracker</h1>
      <Button onClick={signout}>Sign Out</Button>

      <Dialog>
        <DialogTrigger>
          <Button>New Transaction</Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Transaction</DialogTitle>
            <DialogDescription>
              Manage your finance, keep updating your transition
            </DialogDescription>
          </DialogHeader>
          <TransactionForm onTransactionAdded={getData} />
        </DialogContent>
      </Dialog>

      <DataTable columns={columns} data={transactionList}></DataTable>
    </>
  );
};

export default Home;
