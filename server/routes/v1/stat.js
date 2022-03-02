const router = require("express").Router();
const Transaction = require("../../modal/Transaction");
router.post("/", async (req, res) => {
  const { id } = req.body;
  Transaction.find({ userId: id }, (err, response) => {
    if (err) {
      res.send(err);
    } else {
      const creditTransactions = response.filter(
        (item) => item.type == "credit"
      );
      const totalIncome = creditTransactions.reduce(
        (prev, item) => prev + item.amount,
        0
      );

      const debitTransactions = response.filter((item) => item.type == "debit");
      const needTransactions = debitTransactions.filter(
        (item) => item.expenseType == "need"
      );
      const needsTotal = needTransactions
        .reduce((prev, item) => prev + item.amount, 0)
        .toFixed(2);

      const wantTransactions = debitTransactions.filter(
        (item) => item.expenseType == "want"
      );
      const wantesTotal = wantTransactions
        .reduce((prev, item) => prev + item.amount, 0)
        .toFixed(2);

      const investmentTransactions = debitTransactions.filter(
        (item) => item.expenseType == "investment"
      );
      const investmentTotal = investmentTransactions
        .reduce((prev, item) => prev + item.amount, 0)
        .toFixed(2);
      let needStat = {
        title: "Needs",
        total: needsTotal,
        numberOfTransactions: needTransactions.length,
        currentNeedsPercentage:
          ((100 * needsTotal) / totalIncome).toFixed(2) + "%",
      };
      let wantStat = {
        title: "Wants",
        total: wantesTotal,
        numberOfTransactions: wantTransactions.length,
        currentWantsPercentage:
          ((100 * wantesTotal) / totalIncome).toFixed(2) + "%",
      };
      let investmentStat = {
        title: "Investments",
        total: investmentTotal,
        numberOfTransactions: investmentTransactions.length,
        currentInvestmentsPercentage:
          ((100 * investmentTotal) / totalIncome).toFixed(2) + "%",
      };
      let stat = [needStat, wantStat, investmentStat];
      const totalSavings =
        totalIncome - needsTotal - wantesTotal - investmentTotal;
      const savingsPercentage =
        ((100 * totalSavings) / totalIncome).toFixed(2) + "%";
      res.send({
        responseType: true,
        error: false,
        totalIncome: totalIncome,
        stat: stat,
        savings: {
          totalSavings: totalSavings,
          savingsPercentage: savingsPercentage,
        },
      });
    }
  });
});

module.exports = router;
