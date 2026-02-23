const ExcelJS = require("exceljs");
const Expense = require("../models/Expense");
//Add Expense Source
exports.addExpense = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, category, amount, date } = req.body || {};

        //Validation: check for missing fields
        if (!category || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newExpense = new Expense({
            userId,
            icon,
            category,
            amount,
            date: new Date(date)
        });

        await newExpense.save();
        res.status(200).json(newExpense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

//Get All Expense Source
exports.getAllExpense = async (req, res) => {
    const userId = req.user.id;
    const { month, year } = req.query;

    try {
        let query = { userId };

        if (month !== undefined && month !== "" && month !== null) {
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, parseInt(month) + 1, 0, 23, 59, 59, 999);
            query.date = { $gte: startDate, $lte: endDate };
        } else if (year !== undefined) {
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year, 11, 31, 23, 59, 59, 999);
            query.date = { $gte: startDate, $lte: endDate };
        }

        const expense = await Expense.find(query).sort({ date: -1 });
        res.json(expense);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
//Delete Expense Source
exports.deleteExpense = async (req, res) => {
    try {
        await Expense.findByIdAndDelete(req.params.id);
        res.json({ message: "Expense deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
//Download Excel
exports.downloadExpenseExcel = async (req, res) => {
    const userId = req.user.id;
    const { month, year } = req.query;

    try {
        let query = { userId };

        if (month !== undefined && month !== "" && month !== null) {
            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, parseInt(month) + 1, 0, 23, 59, 59, 999);
            query.date = { $gte: startDate, $lte: endDate };
        } else if (year !== undefined && year !== "" && year !== null) {
            const startDate = new Date(year, 0, 1);
            const endDate = new Date(year, 11, 31, 23, 59, 59, 999);
            query.date = { $gte: startDate, $lte: endDate };
        }

        const expense = await Expense.find(query).sort({ date: -1 });

        // Create Workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Expense Details");

        // Define Columns
        worksheet.columns = [
            { header: "Category", key: "category", width: 25 },
            { header: "Amount", key: "amount", width: 15 },
            { header: "Date", key: "date", width: 18 },
        ];

        // Style Header
        worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
        worksheet.getRow(1).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FFE11D48" } // Redish/Expense color ARGB
        };
        worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };

        // Add Data
        expense.forEach((item) => {
            worksheet.addRow({
                category: item.category,
                amount: item.amount,
                date: item.date instanceof Date ? item.date.toLocaleDateString() : 'N/A',
            });
        });

        // Format Amount Column
        worksheet.getColumn("amount").numFmt = '#,##0.00';

        // Add Data Bars (Grafik) to Amount Column
        const rowCount = expense.length;
        if (rowCount > 0) {
            worksheet.addConditionalFormatting({
                ref: `B2:B${rowCount + 1}`,
                rules: [
                    {
                        type: 'dataBar',
                        cfvo: [{ type: 'min' }, { type: 'max' }],
                        color: { argb: 'FFFFE4E6' }, // ARGB
                    },
                ],
            });
        }

        // Set response headers
        res.setHeader(
            "Content-Type",
            "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
        );
        res.setHeader(
            "Content-Disposition",
            "attachment; filename=" + "Expense_Details.xlsx"
        );

        await workbook.xlsx.write(res);
        res.status(200).end();
    } catch (error) {
        console.error("Error generating Excel:", error);
        res.status(500).json({ message: "Server Error" });
    }
}