import moment from "moment";

export const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
};

export const getInitials = (name) => {
    if (!name) return "";

    const words = name.split(" ");
    let initials = "";

    for (let i = 0; i < Math.min(words.length, 2); i++) {
        initials += words[i][0];
    }

    return initials.toUpperCase();
}

export const addThousandsSeparator = (num) => {
    if (num == null || isNaN(num)) return "";

    const [integerPart, fractionalPart] = num.toString().split('.');
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    return fractionalPart
        ? `${formattedInteger}.${fractionalPart}`
        : formattedInteger;
}

export const prepareExpenseBarChartData = (data = []) => {
    const groupedData = data.reduce((acc, item) => {
        const category = item?.category || "Other";
        if (!acc[category]) {
            acc[category] = { label: category, amount: 0, category };
        }
        acc[category].amount += item.amount;
        return acc;
    }, {});

    return Object.values(groupedData);
}

export const prepareIncomeBarChartData = (data = []) => {
    const groupedData = data.reduce((acc, item) => {
        const source = item?.source || "Other";
        if (!acc[source]) {
            acc[source] = { label: source, amount: 0, source };
        }
        acc[source].amount += item.amount;
        return acc;
    }, {});

    return Object.values(groupedData);
}

export const prepareDailyChartData = (data = []) => {
    const sortedData = [...data].sort((a, b) => new Date(a.date) - new Date(b.date));

    const groupedData = sortedData.reduce((acc, item) => {
        const date = moment(item?.date).format("Do MMM");
        if (!acc[date]) {
            acc[date] = { label: date, amount: 0 };
        }
        acc[date].amount += item.amount;
        return acc;
    }, {});

    return Object.values(groupedData);
}

export const prepareYearlyChartData = (data = []) => {
    const months = moment.monthsShort(); // ["Jan", "Feb", ...]
    const groupedData = months.reduce((acc, month) => {
        acc[month] = { label: month, amount: 0 };
        return acc;
    }, {});

    data.forEach(item => {
        const month = moment(item?.date).format("MMM");
        if (groupedData[month]) {
            groupedData[month].amount += item.amount;
        }
    });

    return Object.values(groupedData);
}