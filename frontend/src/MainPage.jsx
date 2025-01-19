import React, { useEffect, useState } from "react";
import {
  Button,
  Box,
  Grid,
  Typography,
  Card,
  CardContent,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Badge,
} from "@mui/material";
import ModalWrapper from "./components/ModalWrapper";
import TransactionForm from "./components/TransactionForm";
import IncomeExpenseChart from "./components/IncomeExpenseChart";
import CategoryAnalyticsChart from "./components/CategoryAnalyticsChart";
import CategoryManager from "./components/CategoryManager";
import SubcategoryManager from "./components/SubcategoryManager";
import AccountManager from "./components/AccountManager";
import BudgetForm from "./components/BudgetForm";
import { useAuth } from "./context/AuthContext";
import api from "./api";

const MainPage = () => {
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openSubcategoryModal, setOpenSubcategoryModal] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [openBudgetModal, setOpenBudgetModal] = useState(false);
  const [categories, setCategories] = useState([]);
  const [accounts, setAccounts] = useState([]);
  const [budget, setBudget] = useState(0);
  const [transactions, setTransactions] = useState([]);
  const [incomeExpenseData, setIncomeExpenseData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    const fetchBudget = async () => {
      try {
        const response = await api.get("/budget/check");
        setBudget(response.data?.budget);
      } catch (error) {
        console.error("Error fetching Budget:", error);
      }
    };

    fetchBudget();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get("/category");

        setCategories(response.data);
      } catch (error) {
        console.error("Error fetching Category:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchAccounts = async () => {
      try {
        const response = await api.get("/accounts");
        setAccounts(response.data);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchAccounts();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const catsRes = await api.get("/category");
        const cats = catsRes.data;

        const response = await api.get("/transactions");
        setTransactions(
          response.data.map((transaction) => ({
            id: transaction._id,
            description: transaction.description,
            amount: transaction.amount,
            type: transaction.type,
            account: transaction.accountId.name,
            category: cats.find((cat) => cat._id === transaction.categoryId)
              .name,
            date: new Date(transaction.date).toISOString().split("T")[0],
          }))
        );

        const income = response.data
          .filter((transaction) => transaction.type === "income")
          .reduce((acc, curr) => acc + curr.amount, 0);
        const expense = response.data
          .filter((transaction) => transaction.type === "expense")
          .reduce((acc, curr) => acc + curr.amount, 0);

        setIncomeExpenseData([
          { type: "Income", amount: income },
          { type: "Expense", amount: expense },
        ]);

        const categoryData = cats.map((cat) => ({
          category: cat.name,
          amount: response.data
            .filter((transaction) => transaction.categoryId === cat._id)
            .reduce((acc, curr) => acc + curr.amount, 0),
        }));

        setCategoryData(categoryData);
      } catch (error) {
        console.error("Error fetching accounts:", error);
      }
    };

    fetchTransactions();
  }, []);

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Hello {user?.firstname}!
      </Typography>
      <Typography variant="body1" gutterBottom>
        Welcome to your personal finance dashboard. Here you can manage your
        transactions, categories, subcategories, accounts, and budgets.
      </Typography>

      {/* Action Buttons for Modals */}
      <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap", my: 4 }}>
        <Button
          variant="contained"
          color="primary"
          onClick={() => setOpenTransactionModal(true)}
        >
          Add Transaction
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => setOpenCategoryModal(true)}
        >
          Manage Categories
        </Button>
        <Button
          variant="contained"
          color="info"
          onClick={() => setOpenAccountModal(true)}
        >
          Manage Accounts
        </Button>
        <Button
          variant="contained"
          color="warning"
          onClick={() => setOpenBudgetModal(true)}
        >
          Set Budget
        </Button>
      </Box>

      {/* Summary Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Income</Typography>
              <Typography variant="h4" color="primary">
                {new Intl.NumberFormat("en-US").format(
                  transactions
                    .filter((transaction) => transaction.type === "income")
                    .reduce((acc, curr) => acc + curr.amount, 0)
                )}{" "}
                Rwf
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Expenses</Typography>
              <Typography variant="h4" color="error">
                {new Intl.NumberFormat("en-US").format(
                  transactions
                    .filter((transaction) => transaction.type === "expense")
                    .reduce((acc, curr) => acc + curr.amount, 0)
                )}{" "}
                Rwf
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Balance</Typography>
              <Typography variant="h4" color="success">
                {new Intl.NumberFormat("en-US").format(
                  transactions
                    .filter((transaction) => transaction.type === "income")
                    .reduce((acc, curr) => acc + curr.amount, 0) -
                    transactions
                      .filter((transaction) => transaction.type === "expense")
                      .reduce((acc, curr) => acc + curr.amount, 0)
                )}{" "}
                Rwf
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">
                Budget Set
                {/* add badge when out of budget */}
                {
                  // if budget is less than total expenses, show badge
                  budget <
                  transactions
                    .filter((transaction) => transaction.type === "expense")
                    .reduce((acc, curr) => acc + curr.amount, 0) ? (
                    <Badge
                      color="error"
                      sx={{
                        width: "50px",
                        paddingX: 3,
                      }}
                      badgeContent="Out of Budget"
                    />
                  ) : null
                }
              </Typography>
              <Typography variant="h4" color="success">
                {new Intl.NumberFormat("en-US").format(budget)} Rwf
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Grid container spacing={3}>
        {/* Transactions Table */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Transactions
              </Typography>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Description</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Type</TableCell>
                    <TableCell>Account</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>
                        {new Intl.NumberFormat("en-US").format(
                          transaction.amount
                        )}{" "}
                        Rwf
                      </TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.account}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>{transaction.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </Grid>

        {/* Analytics Section */}
        <Grid
          item
          xs={12}
          md={4}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Income vs Expense
              </Typography>
              <IncomeExpenseChart data={incomeExpenseData} />
            </CardContent>
          </Card>

          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Category Analytics
              </Typography>
              <CategoryAnalyticsChart data={categoryData} />
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Modals */}
      <ModalWrapper
        open={openTransactionModal}
        onClose={() => setOpenTransactionModal(false)}
        title="Add Transaction"
      >
        <TransactionForm categories={categories} accounts={accounts} />
      </ModalWrapper>

      <ModalWrapper
        open={openCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
        title="Manage Categories"
      >
        <CategoryManager
          categories={categories}
          setCategories={setCategories}
        />
      </ModalWrapper>

      <ModalWrapper
        open={openSubcategoryModal}
        onClose={() => setOpenSubcategoryModal(false)}
        title="Manage Subcategories"
      >
        <SubcategoryManager
          categories={["Food", "Travel"]}
          subcategories={[
            { category: "Food", subcategory: "Groceries" },
            { category: "Travel", subcategory: "Fuel" },
          ]}
          addSubcategory={(category, subcategory) =>
            console.log("Added subcategory:", { category, subcategory })
          }
        />
      </ModalWrapper>

      <ModalWrapper
        open={openAccountModal}
        onClose={() => setOpenAccountModal(false)}
        title="Manage Accounts"
      >
        <AccountManager accounts={accounts} setAccounts={setAccounts} />
      </ModalWrapper>

      <ModalWrapper
        open={openBudgetModal}
        onClose={() => setOpenBudgetModal(false)}
        title="Set Budget"
      >
        <BudgetForm />
      </ModalWrapper>
    </Box>
  );
};

export default MainPage;
