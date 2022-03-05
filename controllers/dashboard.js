const router = require("express").Router();
const authenticateToken = require("./authorization");
const Transaction = require("../modal/Transaction");
router.post("/", authenticateToken, async (req, res) => {
  const { id, dashboardType, customDashboardDate } = req.body;
  let query;
  if (dashboardType == "all") {
    query = Transaction.find({ userId: id });
  } else {
    query = Transaction.find({
      userId: id,
      transactionDate: {
        $gte: customDashboardDate.start,
        $lte: customDashboardDate.end,
      },
    });
  }

  query.exec((err, response) => {
    if (err) {
      res.send(err);
    } else {
      const allTransactions = response;
      const creditTransactions = response.filter(
        (item) => item.type == "credit"
      );
      const debitTransactions = response.filter((item) => item.type == "debit");
      const totalIncome = creditTransactions.reduce(
        (acc, item) => acc + item.amount,
        0
      );
      const totalExpense = debitTransactions.reduce(
        (acc, item) => acc + item.amount,
        0
      );
      let foodTransactions = { cat: "food", total: 0, transactions: [] };
      let rechargeTransactions = {
        cat: "recharge",
        total: 0,
        transactions: [],
      };
      let transferTransactions = {
        cat: "transfer",
        total: 0,
        transactions: [],
      };
      let entertainmentTransactions = {
        cat: "entertainment",
        total: 0,
        transactions: [],
      };
      let fuelTransactions = { cat: "fuel", total: 0, transactions: [] };
      let groceriesTransactions = {
        cat: "groceries",
        total: 0,
        transactions: [],
      };
      let medicalTransactions = { cat: "medical", total: 0, transactions: [] };
      let loanTransactions = { cat: "loan", total: 0, transactions: [] };
      let travelTransactions = { cat: "travel", total: 0, transactions: [] };
      let shoppingTransactions = {
        cat: "shopping",
        total: 0,
        transactions: [],
      };
      let otherTransactions = { cat: "other", total: 0, transactions: [] };
      let investmentTransactions = {
        cat: "investment",
        total: 0,
        transactions: [],
      };

      for (let i = 0; i < debitTransactions.length; i++) {
        switch (debitTransactions[i].transactionCat) {
          case "food":
            foodTransactions.transactions.push(debitTransactions[i]);
            foodTransactions.total += debitTransactions[i].amount;
            break;
          case "recharge":
            rechargeTransactions.transactions.push(debitTransactions[i]);
            rechargeTransactions.total += debitTransactions[i].amount;
            break;
          case "transfer":
            transferTransactions.transactions.push(debitTransactions[i]);
            transferTransactions.total += debitTransactions[i].amount;
            break;
          case "entertainment":
            entertainmentTransactions.transactions.push(debitTransactions[i]);
            entertainmentTransactions.total += debitTransactions[i].amount;
            break;
          case "fuel":
            fuelTransactions.transactions.push(debitTransactions[i]);
            fuelTransactions.total += debitTransactions[i].amount;
            break;
          case "groceries":
            groceriesTransactions.transactions.push(debitTransactions[i]);
            groceriesTransactions.total += debitTransactions[i].amount;
            break;
          case "medical":
            medicalTransactions.transactions.push(debitTransactions[i]);
            medicalTransactions.total += debitTransactions[i].amount;
            break;
          case "loan":
            loanTransactions.transactions.push(debitTransactions[i]);
            loanTransactions.total += debitTransactions[i].amount;
            break;
          case "travel":
            travelTransactions.transactions.push(debitTransactions[i]);
            travelTransactions.total += debitTransactions[i].amount;
            break;
          case "shopping":
            shoppingTransactions.transactions.push(debitTransactions[i]);
            shoppingTransactions.total += debitTransactions[i].amount;
            break;
          case "other":
            otherTransactions.transactions.push(debitTransactions[i]);
            otherTransactions.total += debitTransactions[i].amount;
            break;
          case "investment":
            investmentTransactions.transactions.push(debitTransactions[i]);
            investmentTransactions.total += debitTransactions[i].amount;
            break;
          default:
        }
      }

      let transactionCategories = [
        foodTransactions,
        rechargeTransactions,
        transferTransactions,
        entertainmentTransactions,
        fuelTransactions,
        groceriesTransactions,
        loanTransactions,
        travelTransactions,
        shoppingTransactions,
        otherTransactions,
        medicalTransactions,
        investmentTransactions,
      ];
      transactionCategories.sort((a, b) => b.total - a.total);

      const dashboardData = {
        responseType: true,
        error: false,
        totalIncome: totalIncome.toFixed(2),
        totalExpense: (totalExpense - investmentTransactions.total).toFixed(2),
        totalInvestment: investmentTransactions.total.toFixed(2),
        allTransactions: allTransactions.sort(
          (a, b) => b.transactionDate - a.transactionDate
        ),
        creditTransactions: creditTransactions.sort(
          (a, b) => b.transactionDate - a.transactionDate
        ),
        debitTransactions: debitTransactions.sort(
          (a, b) => b.transactionDate - a.transactionDate
        ),
        transactionCategories: transactionCategories.filter(
          (item) => item.total > 0
        ),
      };
      res.send(dashboardData);
    }
  });
});

module.exports = router;
