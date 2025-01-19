import React, { useState } from "react";
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
} from "@mui/material";
import ModalWrapper from "./components/ModalWrapper";
import TransactionForm from "./components/TransactionForm";
import IncomeExpenseChart from "./components/IncomeExpenseChart";
import CategoryAnalyticsChart from "./components/CategoryAnalyticsChart";
import CategoryManager from "./components/CategoryManager";
import SubcategoryManager from "./components/SubcategoryManager";
import AccountManager from "./components/AccountManager";
import BudgetForm from "./components/BudgetForm";

const MainPage = () => {
  const [openTransactionModal, setOpenTransactionModal] = useState(false);
  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openSubcategoryModal, setOpenSubcategoryModal] = useState(false);
  const [openAccountModal, setOpenAccountModal] = useState(false);
  const [openBudgetModal, setOpenBudgetModal] = useState(false);

  // Mock Data
  const transactions = [
    {
      id: 1,
      description: "Salary",
      amount: 2000,
      type: "Income",
      account: "Equity Bank",
      category: "Work",
      subcategory: "Bonus",
      date: "2025-01-01",
    },
    {
      id: 2,
      description: "Groceries",
      amount: -150,
      type: "Expense",
      account: "Mobile Money",
      category: "Food",
      subcategory: "Groceries",
      date: "2025-01-02",
    },
  ];

  const incomeExpenseData = [
    { type: "Income", amount: 2000 },
    { type: "Expense", amount: 500 },
  ];

  const categoryData = [
    { category: "Food", amount: 200 },
    { category: "Travel", amount: 100 },
    { category: "Entertainment", amount: 50 },
    { category: "Miscellaneous", amount: 150 },
  ];

  return (
    <Box>
      <Typography variant="h4" gutterBottom>
        Hello User!
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
          color="success"
          onClick={() => setOpenSubcategoryModal(true)}
        >
          Manage Subcategories
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
                $2000
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Total Expenses</Typography>
              <Typography variant="h4" color="error">
                $500
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card>
            <CardContent>
              <Typography variant="h6">Balance</Typography>
              <Typography variant="h4" color="success">
                $1500
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
                    <TableCell>Subcategory</TableCell>
                    <TableCell>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {transactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell>{transaction.description}</TableCell>
                      <TableCell>${transaction.amount.toFixed(2)}</TableCell>
                      <TableCell>{transaction.type}</TableCell>
                      <TableCell>{transaction.account}</TableCell>
                      <TableCell>{transaction.category}</TableCell>
                      <TableCell>{transaction.subcategory}</TableCell>
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
        <TransactionForm
          addTransaction={(transaction) => console.log(transaction)}
          categories={["Food", "Travel", "Entertainment"]}
          subcategories={["Groceries", "Fuel"]}
        />
      </ModalWrapper>

      <ModalWrapper
        open={openCategoryModal}
        onClose={() => setOpenCategoryModal(false)}
        title="Manage Categories"
      >
        <CategoryManager
          categories={["Food", "Travel"]}
          addCategory={(category) => console.log("Added category:", category)}
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
        <AccountManager
        />
      </ModalWrapper>

      <ModalWrapper
        open={openBudgetModal}
        onClose={() => setOpenBudgetModal(false)}
        title="Set Budget"
      >
        <BudgetForm
          budgets={[]}
          setBudget={(budget) => console.log("Set budget:", budget)}
        />
      </ModalWrapper>
    </Box>
  );
};

export default MainPage;
