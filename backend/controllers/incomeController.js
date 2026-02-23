const ExcelJS = require("exceljs");
const Income = require("../models/Income");
//Add Income Source
exports.addIncome = async (req, res) => {
    const userId = req.user.id;

    try {
        const { icon, source, amount, date } = req.body || {};

        //Validation: check for missing fields
        if (!source || !amount || !date) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const newIncome = new Income({
            userId,
            icon,
            source,
            amount,
            date: new Date(date)
        });

        await newIncome.save();
        res.status(200).json(newIncome);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}

//Get All Income Source
exports.getAllIncome = async (req, res) => {
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

        const income = await Income.find(query).sort({ date: -1 });
        res.json(income);
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
//Delete Income Source
exports.deleteIncome = async (req, res) => {
    try {
        await Income.findByIdAndDelete(req.params.id);
        res.json({ message: "Income deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server Error" });
    }
}
//Download Excel
exports.downloadIncomeExcel = async (req, res) => {
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

        const income = await Income.find(query).sort({ date: -1 });

        // Create Workbook
        const workbook = new ExcelJS.Workbook();
        const worksheet = workbook.addWorksheet("Income Details");

        // Define Columns
        worksheet.columns = [
            { header: "Source", key: "source", width: 25 },
            { header: "Amount", key: "amount", width: 15 },
            { header: "Date", key: "date", width: 18 },
        ];

        // Style Header
        worksheet.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
        worksheet.getRow(1).fill = {
            type: "pattern",
            pattern: "solid",
            fgColor: { argb: "FF875CF5" } // Primary color with Alpha
        };
        worksheet.getRow(1).alignment = { vertical: "middle", horizontal: "center" };

        // Add Data
        income.forEach((item) => {
            worksheet.addRow({
                source: item.source,
                amount: item.amount,
                date: item.date instanceof Date ? item.date.toLocaleDateString() : 'N/A',
            });
        });

        // Format Amount Column
        worksheet.getColumn("amount").numFmt = '#,##0.00';

        // Add Data Bars (Grafik) to Amount Column
        // Calculate the range for formatting
        const rowCount = income.length;
        if (rowCount > 0) {
            worksheet.addConditionalFormatting({
                ref: `B2:B${rowCount + 1}`,
                rules: [
                    {
                        type: 'dataBar',
                        cfvo: [{ type: 'min' }, { type: 'max' }],
                        color: { argb: 'FFC7B8FF' }, // ARGB
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
            "attachment; filename=" + "Income_Details.xlsx"
        );

        await workbook.xlsx.write(res);
        res.status(200).end();
    } catch (error) {
        console.error("Error generating Excel:", error);
        res.status(500).json({ message: "Server Error" });
    }
}