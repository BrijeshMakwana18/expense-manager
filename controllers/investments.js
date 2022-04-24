const router = require("express").Router();
const axios = require("axios").default;
const cheerio = require("cheerio");
const authorization = require("./authorization");
// const MF = "https://api.mfapi.in/mf";
const yahooFinance = "https://finance.yahoo.com/quote/";

router.post("/", authorization, async (req, res) => {
  let portfolio = {
    mutualFunds: [
      { id: 135781, units: 286.576, avg: 34.89 },
      { id: 120465, units: 2036.235, avg: 49.1 },
      { id: 120847, units: 5.52, avg: 250.8213 },
    ],
    indianStocks: [
      { id: "GOLDBEES.NS", units: 450, avg: 44.1 },
      { id: "IRB.NS", units: 25, avg: 259.55 },
      { id: "NIFTYBEES.NS", units: 200, avg: 179.96 },
    ],
  };
  let stocks = [];
  //Stocks
  let indianStocks = portfolio.indianStocks;
  for (let i = 0; i < indianStocks.length; i++) {
    await axios(yahooFinance + indianStocks[i].id).then((response) => {
      let html = response.data;
      const $ = cheerio.load(html);
      let priceData = $("div > div > div > fin-streamer").html();
      let priceChangeData = $(
        "div > div > div > fin-streamer:nth-child(2) > span"
      ).html();
      let changePercentageData = $(
        "div > div > div > fin-streamer:nth-child(3) > span"
      ).html();
      let nameData = $("div > div> div > h1").html();
      let lastUpdatedData = $("#quote-market-notice > span").html();
      //Calculation values
      let units = indianStocks[i].units;
      let investedNav = indianStocks[i].avg;
      let currentNav = parseFloat(priceData.replace(/,/g, ""));
      let priceChange = parseFloat(priceChangeData);
      let pricePercentChange = parseFloat(
        changePercentageData.replace(/%|[(]|[)]/g, "")
      );
      let investmentValue = investedNav * units;
      let currentValue = currentNav * units;
      let investmentValueChange = (currentValue - investmentValue).toFixed(2);
      let navChange = {
        price: priceChange,
        percentage: `${pricePercentChange}%`,
      };
      let dailyStockPriceChange = priceChange * units;
      let totalInvestmentChange = {
        price: investmentValueChange,
        percentage: `${(
          (100 * investmentValueChange) /
          investmentValue
        ).toFixed(2)}%`,
      };
      let tempStocks = {
        id: indianStocks[i].id,
        name: nameData.toString(),
        units: units,
        investedNav: investedNav,
        currentNav: currentNav,
        investmentValue: investmentValue,
        currentValue: currentValue,
        lastUpdated: lastUpdatedData.toString(),
        dailyPriceChange: dailyStockPriceChange,
        navChange: navChange,
        investmentChange: totalInvestmentChange,
      };
      stocks.push(tempStocks);
    });
  }
  let totalStocksInvestment = stocks.reduce(
    (acc, item) => acc + item.investmentValue,
    0
  );
  let totalStocksValue = stocks.reduce(
    (acc, item) => acc + item.currentValue,
    0
  );
  let totalStocksPL = totalStocksValue - totalStocksInvestment;
  let totalStocksPLPercentage = (
    (100 * totalStocksPL) /
    totalStocksInvestment
  ).toFixed(2);
  let dailyStockPriceChange = stocks.reduce(
    (acc, item) => acc + item.dailyPriceChange,
    0
  );
  let dailyStockPercentageChange = (
    (100 * dailyStockPriceChange) /
    totalStocksInvestment
  ).toFixed(2);

  let MF = [];
  //MF
  let mutualFunds = portfolio.mutualFunds;
  for (let i = 0; i < mutualFunds.length; i++) {
    await axios
      .get(`https://api.mfapi.in/mf/${mutualFunds[i].id}`)
      .then((response) => {
        if (response.data.status === "SUCCESS") {
          //Mutual fund data
          let meta = response.data.meta;
          let data = response.data.data;

          //Calculation values
          let units = mutualFunds[i].units;
          let investedNav = mutualFunds[i].avg;
          let currentNav = parseFloat(data[0].nav);
          let previousNav = data[1].nav;
          let priceChange = (currentNav - previousNav).toFixed(2);
          let investmentValue = investedNav * units;
          let currentValue = currentNav * units;
          let investmentValueChange = (currentValue - investmentValue).toFixed(
            2
          );
          let dailyMFPriceChange = priceChange * units;
          let navChange = {
            price: priceChange,
            percentage: `${((100 * priceChange) / previousNav).toFixed(2)}%`,
          };
          let investmentChange = {
            price: investmentValueChange,
            percentage: `${(
              (100 * investmentValueChange) /
              investmentValue
            ).toFixed(2)}%`,
          };
          let temp = {
            id: meta.scheme_code,
            name: meta.scheme_name,
            investedNav: investedNav,
            currentNav: currentNav,
            investmentValue: investmentValue,
            currentValue: currentValue,
            units: units,
            lastUpdated: data[0].date,
            dailyMFPriceChange: dailyMFPriceChange,
            navChange: navChange,
            investmentChange: investmentChange,
          };
          MF.push(temp);
        }
      });
  }
  let totalMFInvestment = MF.reduce(
    (acc, item) => acc + item.investmentValue,
    0
  );
  let totalMFValue = MF.reduce((acc, item) => acc + item.currentValue, 0);
  let totalMFPL = totalMFValue - totalMFInvestment;
  let totalMFPLPercentage = ((100 * totalMFPL) / totalMFInvestment).toFixed(2);
  let dailyMFPriceChange = MF.reduce(
    (acc, item) => acc + item.dailyMFPriceChange,
    0
  );
  let dailyMFPercentageChange = (
    (100 * dailyMFPriceChange) /
    totalMFInvestment
  ).toFixed(2);

  res.send({
    mutualFunds: {
      totalMFInvestment: totalMFInvestment,
      totalMFValue: totalMFValue,
      totalMFPL: totalMFPL,
      totalMFPLPercentage: `${totalMFPLPercentage}%`,
      dailyPriceChange: dailyMFPriceChange.toFixed(2),
      dailyPercentageChange: `${dailyMFPercentageChange}%`,
      data: MF,
    },
    stocks: {
      totalStocksInvestment: totalStocksInvestment,
      totalStocksValue: totalStocksValue,
      totalStocksPL: totalStocksPL,
      totalStocksPLPercentage: `${totalStocksPLPercentage}%`,
      dailyPriceChange: dailyStockPriceChange.toFixed(2),
      dailyPercentageChange: `${dailyStockPercentageChange}%`,
      data: stocks,
    },
  });
});

module.exports = router;
