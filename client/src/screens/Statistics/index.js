import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {connect} from 'react-redux';
import {StatSkeleton} from '../../components';
import {colors, strings, perfectSize, fonts} from '../../theme';
import {fetchInvestments} from '../Home/actions';
import styles from './styles';
import {FlatList} from 'react-native-gesture-handler';
const INDIA = 'INDIA';
const US = 'US';
class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      market: US,
    };
  }

  getPortfolio() {
    const {isInvestmentsLoading, investments, dashboardData} =
      this.props.AppReducer;
    let MF = investments.mutualFunds;
    let stocks = investments.stocks;
    let totalInvestmentValue = dashboardData.totalInvestment;
    let currentInvestmentValue = MF.totalMFValue + stocks.totalStocksValue;
    let PL = currentInvestmentValue - totalInvestmentValue;
    let PLPercentage = parseFloat((100 * PL) / totalInvestmentValue);

    let usStocks = investments.us.stocks;
    let totalUSInvestment = investments.us.totalInvestment;
    let currentUSInvestmentValue = investments.us.currentInvestmentValue;
    let usPL = currentUSInvestmentValue - totalUSInvestment;
    let usPLPercentage = parseFloat((100 * usPL) / totalUSInvestment);
    if (this.state.market === US) {
      return {
        totalInvestmentValue: parseFloat(totalUSInvestment).toFixed(2),
        currentInvestmentValue: parseFloat(currentUSInvestmentValue).toFixed(2),
        PL: parseFloat(usPL).toFixed(2),
        PLPercentage: usPLPercentage.toFixed(2),
      };
    }
    return {
      totalInvestmentValue: parseFloat(totalInvestmentValue).toFixed(2),
      currentInvestmentValue: parseFloat(currentInvestmentValue).toFixed(2),
      PL: parseFloat(PL).toFixed(2),
      PLPercentage: PLPercentage.toFixed(2),
    };
  }

  renderStocks = (item, index) => {
    return (
      <View style={styles.stockContainer} key={index}>
        <View
          style={{
            width: '60%',
          }}>
          <Text style={styles.investedNav}>{`Avg: ${item.investedNav}`}</Text>
          <Text style={styles.stockTitle} numberOfLines={1}>
            {item.name ? item.name.toUpperCase() : item.id}
          </Text>
          <Text
            style={
              styles.investedValue
            }>{`Invested: ${item.investmentValue}`}</Text>
        </View>
        <View
          style={{
            alignItems: 'flex-end',
            width: '40%',
          }}>
          <Text
            style={[
              styles.investedNav,
              {
                color:
                  parseFloat(item.investmentChange.percentage) > 0
                    ? colors.positiveColor
                    : colors.negativeColor,
              },
            ]}>
            {item.investmentChange.percentage}
          </Text>
          <Text
            style={[
              styles.stockTitle,
              {
                color:
                  item.investmentChange.price > 0
                    ? colors.positiveColor
                    : colors.negativeColor,
              },
            ]}>
            {item.investmentChange.price}
          </Text>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={[
                styles.investedValue,
                {
                  marginRight: perfectSize(10),
                },
              ]}>
              {item.currentNav}
            </Text>
            <Text
              style={[
                styles.investedValue,
                {
                  color:
                    parseFloat(item.navChange.percentage) > 0
                      ? colors.positiveColor
                      : colors.negativeColor,
                },
              ]}>
              {item.navChange.percentage}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  render() {
    const {market} = this.state;
    const {investments, isInvestmentsLoading} = this.props.AppReducer;
    const {totalInvestmentValue, currentInvestmentValue, PL, PLPercentage} =
      this.getPortfolio();

    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          backgroundColor={colors.primaryBackgroundColor}
          barStyle="light-content"
        />
        <Text
          style={{
            fontSize: perfectSize(24),
            color: 'white',
          }}>
          Coming Soon
        </Text>
      </View>
    );
  }
}

const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer, AppReducer: state.AppReducer};
};

const mapDispatchToProps = {
  fetchInvestments: fetchInvestments,
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
