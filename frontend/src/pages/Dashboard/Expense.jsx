import React, { useEffect, useState } from 'react'
import { useUserAuth } from '../../hooks/useUserAuth';
import DashboardLayout from '../../components/layouts/DashboardLayout';
import { API_PATHS } from '../../utils/apiPath';
import toast from 'react-hot-toast';
import axiosInstance from '../../utils/axiosInstance';
import ExpenseOverview from '../../components/Expense/ExpenseOverview';
import Modal from '../../components/Modal';
import AddExpenseForm from '../../components/Expense/AddExpenseForm';
import ExpenseList from '../../components/Expense/ExpenseList';
import DeleteAlert from '../../components/DeleteAlert';
import MonthYearFilter from '../../components/Dashboard/MonthYearFilter';
import ExportDataCard from '../../components/Cards/ExportDataCard';

const Expense = () => {
  useUserAuth();

  const [expenseData, setExpenseData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [openDeleteAlert, setOpenDeleteAlert] = useState({
    show: false,
    data: null
  });
  const [openAddExpenseModal, setOpenAddExpenseModal] = useState(false);

  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth());
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const [viewType, setViewType] = useState("monthly");

  //Get All Expense Details
  const fetchExpenseDetails = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const params = { year: selectedYear };
      if (viewType === "monthly") {
        params.month = selectedMonth;
      }

      const response = await axiosInstance.get(
        `${API_PATHS.EXPENSE.GET_ALL_EXPENSE}`,
        { params }
      );

      if (response.data) {
        setExpenseData(response.data);
      }
    } catch (error) {
      console.log("something went wrong, please try again.", error);
    } finally {
      setLoading(false);
    }
  };

  //Handle Add Expense
  const handleAddExpense = async (expense) => {
    const { category, amount, date, icon } = expense;

    // Validation checks
    if (!category.trim()) {
      toast.error("Category is required");
      return;
    }
    if (!amount || isNaN(amount) || Number(amount) <= 0) {
      toast.error("Amount should be a valid number greater than 0");
    }

    if (!date) {
      toast.error("Date is required");
      return;
    }

    try {
      await axiosInstance.post(API_PATHS.EXPENSE.ADD_EXPENSE, {
        category,
        amount,
        date,
        icon,
      });

      setOpenAddExpenseModal(false);
      toast.success("Expense added successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error adding expense:", error.response?.data?.message || error.message);
    }
  };

  //Delete Expense
  const deleteExpense = async (id) => {
    try {
      await axiosInstance.delete(API_PATHS.EXPENSE.DELETE_EXPENSE(id));
      setOpenDeleteAlert({ show: false, data: null });
      toast.success("Expense details deleted successfully");
      fetchExpenseDetails();
    } catch (error) {
      console.error("Error deleting expense:", error.response?.data?.message || error.message);
    }
  };

  //handle download expense details
  const handleDownloadExpenseDetails = async () => {
    try {
      const params = {
        year: selectedYear,
        month: viewType === "monthly" ? selectedMonth : undefined
      };

      const response = await axiosInstance.get(API_PATHS.EXPENSE.DOWNLOAD_EXPENSE, {
        params,
        responseType: 'blob',
      });

      //Create a URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'expense_details.xlsx');
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading expense details:", error);
      toast.error("Failed to download expense details. Please try again.");
    }
  };

  useEffect(() => {
    fetchExpenseDetails();
  }, [selectedMonth, selectedYear, viewType]);
  return (
    <DashboardLayout activeMenu="Expense">
      <div className="my-5 mx-auto">
        <MonthYearFilter
          selectedMonth={selectedMonth}
          selectedYear={selectedYear}
          onMonthChange={setSelectedMonth}
          onYearChange={setSelectedYear}
          viewType={viewType}
          onViewTypeChange={setViewType}
        />
        <div className="grid grid-cols-1 gap-6">
          <ExpenseOverview
            transactions={expenseData}
            onAddExpense={() => setOpenAddExpenseModal(true)}
            viewType={viewType}
          />
        </div>
      </div>

      <ExpenseList
        transactions={expenseData}
        onDelete={(id) => setOpenDeleteAlert({ show: true, data: id })}
        onDownload={handleDownloadExpenseDetails}
      />

      <div className="mt-6 mb-10">
        <ExportDataCard
          type="Expense"
          onExport={handleDownloadExpenseDetails}
        />
      </div>
      <Modal
        isOpen={openAddExpenseModal}
        onClose={() => setOpenAddExpenseModal(false)}
        title="Add Expense"
      >
        <AddExpenseForm
          onAddExpense={handleAddExpense}
          categories={[...new Set(expenseData.map(item => item.category))].filter(Boolean)}
        />
      </Modal>

      <Modal
        isOpen={openDeleteAlert.show}
        onClose={() => setOpenDeleteAlert({ show: false, data: null })}
        title="Delete Expense"
      >
        <DeleteAlert
          content="Are you sure you want to delete this expense?"
          onDelete={() => deleteExpense(openDeleteAlert.data)}
        />
      </Modal>
    </DashboardLayout>
  )
}

export default Expense