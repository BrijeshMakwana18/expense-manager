import React, {Component} from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  DeviceEventEmitter,
} from 'react-native';
import {PrimaryHeader, NoDataFound} from '../../components';
import {strings, images, colors, perfectSize, fonts} from '../../theme';
import styles from './styles';
import {connect} from 'react-redux';
import {getDisplayDate} from '../../utils/globalMethods';
import {decryptV1} from '../../configs/index';
class TransactionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: 'debit',
      hasDebitTransactions: false,
      hasCreditTransactions: false,
    };
  }

  componentDidMount() {
    DeviceEventEmitter.emit('HideTabBar', true);
    const {isFromExpenseCat} = this.props.route.params;
    let allTransactions = this.getListData();
    console.log(allTransactions.length);
    if (!isFromExpenseCat && allTransactions) {
      for (let i = 0; i < allTransactions?.length; i++) {
        if (allTransactions[i].type === 'debit') {
          this.setState({
            hasDebitTransactions: true,
          });
          break;
        }
      }
      for (let i = 0; i < allTransactions?.length; i++) {
        if (allTransactions[i].type === 'credit') {
          this.setState({
            hasCreditTransactions: true,
          });
          break;
        }
      }
    }
  }

  renderAllTransactions = (item, index) => {
    const {type, transactionCat, transactionDate, amount, notes} = item;
    const {selectedFilter} = this.state;
    if (type === selectedFilter) {
      return (
        <TouchableOpacity
          onPress={() => {
            this.props.navigation.navigate('AddExpense', {
              isEdit: true,
              item: item,
            });
          }}
          style={[
            styles.transactionContainer,
            {
              backgroundColor:
                type === 'debit'
                  ? colors.secondaryBackgroundColor
                  : colors.creditTransactionBackgroundColor,
            },
          ]}>
          <View style={styles.transactionImageContainer}>
            <Image
              source={
                type === 'debit'
                  ? images[transactionCat]
                  : images.incomePlaceholder
              }
              style={styles.transactionImage}
            />
          </View>
          <View style={styles.transactionDetailsContainer}>
            <Text numberOfLines={1} style={styles.transactionNotes}>
              {decryptV1(notes)}
            </Text>
            <Text style={styles.transactionDate}>
              {getDisplayDate(transactionDate)}
            </Text>
          </View>
          <Text
            style={[
              styles.transactionAmount,
              {
                color:
                  type === 'debit'
                    ? colors.titleColor
                    : colors.creditTransactionAmountColor,
              },
            ]}>
            {type === 'debit' ? '-' : '+'}
            {amount}
          </Text>
        </TouchableOpacity>
      );
    }
  };

  getTransactionPeriodTitle = () => {
    const {overallExpense, monthlyExpense, customExpense} =
      strings.allTransactions;
    const {selectedFilter, dateRange} = this.props.route.params;
    let selectedStartDateTimeStamp, selectedEndDateTimeStamp;
    if (dateRange) {
      selectedStartDateTimeStamp = dateRange.start;
      selectedEndDateTimeStamp = dateRange.end;
    }
    switch (selectedFilter) {
      case 'all':
        return overallExpense;
      case 'month':
        return monthlyExpense;
      case 'custom':
        const startDate = selectedStartDateTimeStamp
          ? getDisplayDate(selectedStartDateTimeStamp)
          : '';
        const endDate = selectedEndDateTimeStamp
          ? getDisplayDate(selectedEndDateTimeStamp)
          : '';
        return customExpense + ': ' + startDate + '-' + endDate;
    }
  };

  getListData = () => {
    const {isFromExpenseCat, selectedExpenseCat} = this.props.route.params;
    const {dashboardData} = this.props.AppReducer;
    if (isFromExpenseCat) {
      return dashboardData.transactionCategories
        .find(element => element.cat === selectedExpenseCat)
        .transactions.reverse();
    } else {
      return dashboardData.allTransactions;
    }
  };
  getDasListVisibility = () => {
    const {isFromExpenseCat} = this.props.route.params;
    if (!isFromExpenseCat) {
      const {selectedFilter, hasCreditTransactions, hasDebitTransactions} =
        this.state;

      if (selectedFilter === 'debit' && hasDebitTransactions) {
        return true;
      } else if (selectedFilter === 'credit' && hasCreditTransactions) {
        return true;
      } else {
        return false;
      }
    } else {
      return true;
    }
  };

  render() {
    const {headerTitle, filterOne, filterTwo} = strings.allTransactions;
    const {isFromExpenseCat} = this.props.route.params;
    const {selectedFilter} = this.state;
    return (
      <View style={styles.container}>
        <PrimaryHeader
          onPress={() => {
            this.props.navigation.goBack();
            DeviceEventEmitter.emit('HideTabBar', false);
          }}
          title={headerTitle}
          leftImage={images.backArrow}
          rightImage={
            selectedFilter === 'credit' ? images.income : images.expense
          }
          rightTintColorDisabled
          rightImageOpacity={1}
        />
        <Text style={styles.transactionPeriodTitle}>
          {this.getTransactionPeriodTitle()}
        </Text>
        {!isFromExpenseCat && (
          <View style={styles.filterContainer}>
            <TouchableOpacity
              onPress={() => this.setState({selectedFilter: 'debit'})}
              style={[
                styles.filterButtonContainer,
                {
                  backgroundColor:
                    selectedFilter === 'debit'
                      ? colors.primaryAppColor
                      : colors.secondaryBackgroundColor,
                },
              ]}>
              <Text style={styles.filterButtonTitle}>{filterOne}</Text>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => this.setState({selectedFilter: 'credit'})}
              style={[
                styles.filterButtonContainer,
                {
                  backgroundColor:
                    selectedFilter === 'credit'
                      ? colors.primaryAppColor
                      : colors.secondaryBackgroundColor,
                },
              ]}>
              <Text style={styles.filterButtonTitle}>{filterTwo}</Text>
            </TouchableOpacity>
          </View>
        )}
        {this.getDasListVisibility() ? (
          <FlatList
            data={this.getListData()}
            contentContainerStyle={styles.catListContainer}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) =>
              this.renderAllTransactions(item, index)
            }
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <NoDataFound selectedFilter={selectedFilter} />
        )}
      </View>
    );
  }
}
// const mapDispatchToProps = dispatch => {};
const mapStateToProps = state => {
  return {
    AppReducer: state.AppReducer,
  };
};
export default connect(mapStateToProps)(TransactionList);
