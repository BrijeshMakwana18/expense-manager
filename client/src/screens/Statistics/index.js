import React, {Component} from 'react';
import {
  Text,
  View,
  StatusBar,
  Animated,
  Platform,
  Easing,
  FlatList,
} from 'react-native';
import {connect} from 'react-redux';
import {handleFetchStat} from './actions';
import {
  CircularProgress,
  StatSkeleton,
  Filter,
  DatePicker,
  NoDataFound,
} from '../../components';
import {colors, strings, perfectSize, fonts} from '../../theme';
import styles from './styles';
import {
  getDisplayDate,
  getCurrentTimestamps,
  getCurrentMonth,
} from '../../utils/globalMethods';
const CircularChart = ({item, index}) => {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: colors.tabBarBackgroundColor,
        borderRadius: perfectSize(10),
        width: '45%',
        height: perfectSize(300),
      }}>
      <CircularProgress
        percent={item.percentage}
        radius={perfectSize(80)}
        bgRingWidth={perfectSize(10)}
        progressRingWidth={perfectSize(10)}
        ringColor={colors.primaryAppColor}
        ringBgColor={colors.secondaryBackgroundColor}
        textFontSize={perfectSize(25)}
        textFontColor={colors.titleColor}
        textFontWeight={'bold'}
        clockwise={true}
        bgColor={'white'}
        startDegrees={0}
      />
      <Text
        style={{
          fontSize: perfectSize(23),
          fontFamily: fonts.quicksandBold,
          color: colors.titleColor,
        }}>
        {item.title}
      </Text>
      <Text
        style={{
          fontSize: perfectSize(20),
          fontFamily: fonts.avenirMedium,
          color: colors.titleColor,
        }}>
        {item.total}
      </Text>
      <Text
        style={{
          fontSize: perfectSize(20),
          fontFamily: fonts.avenirMedium,
          color: colors.titleColor,
          fontWeight: 'bold',
        }}>
        {`${item.numberOfTransactions} ${strings.statistics.transactions}`}
      </Text>
    </View>
  );
};
class Statistics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedFilter: 'month',
      stats: false,
      monthFilter: getCurrentMonth(),
      selectedStartDateTimeStamp: getCurrentTimestamps().start,
      selectedEndDateTimeStamp: getCurrentTimestamps().end,
      datePicker: false,
      error: false,
    };
    this.errorModalTop = new Animated.Value(perfectSize(-500));
  }

  componentDidMount() {
    this.fetchStats();
  }
  fetchStats() {
    this.setState({
      stats: false,
    });
    const params = {
      id: this.props.LoginReducer.user.id,
      statisticsType: this.state.selectedFilter,
      customStatisticsDate: {
        start: this.state.selectedStartDateTimeStamp,
        end: this.state.selectedEndDateTimeStamp,
      },
    };
    this.props.handleFetchStat({
      params,
      token: this.props.LoginReducer.user.token,
      onSuccess: response => {
        console.log(response);
        if (response.responseType) {
          this.setState({
            stats: response.stat,
            error: false,
          });
        } else {
          this.setState({
            error: response.error,
          });
        }
      },
      onError: error => {
        console.log('error', error);
      },
    });
  }
  handleFilterPress = filter => {
    switch (filter) {
      case 'all':
        this.setState(
          {
            selectedFilter: 'all',
            selectedStartDateTimeStamp: null,
            selectedEndDateTimeStamp: null,
          },
          () => {
            this.fetchStats();
          },
        );
        break;
      case 'month':
        this.setState(
          {
            selectedFilter: 'month',
            selectedStartDateTimeStamp: getCurrentTimestamps().start,
            selectedEndDateTimeStamp: getCurrentTimestamps().end,
          },
          () => {
            this.fetchStats();
          },
        );
        break;
      case 'custom':
        this.setState({
          selectedStartDateTimeStamp: null,
          selectedEndDateTimeStamp: null,
        });
        this.setState({selectedFilter: 'custom', datePicker: true});
        break;
    }
  };
  onDateChange = (date, type) => {
    if (date != null) {
      date = new Date(date);
    }
    if (type === 'END_DATE') {
      this.setState({
        selectedEndDateTimeStamp: date,
      });
    } else {
      this.setState({
        selectedStartDateTimeStamp: date,
        selectedEndDateTimeStamp: null,
      });
    }
  };
  handleDateSubmit = () => {
    const {selectedStartDateTimeStamp, selectedEndDateTimeStamp} = this.state;
    if (
      selectedStartDateTimeStamp == null ||
      selectedEndDateTimeStamp == null
    ) {
      this.showError();
    } else {
      this.setState({datePicker: false});
      this.fetchStats();
    }
  };
  handleCancelDate = () => {
    const {selectedStartDateTimeStamp, selectedEndDateTimeStamp} = this.state;
    if (selectedEndDateTimeStamp && selectedStartDateTimeStamp) {
      this.setState({
        datePicker: false,
      });
    } else {
      this.setState({
        selectedFilter: 'all',
        datePicker: false,
      });
    }
  };
  showError = () => {
    Animated.timing(this.errorModalTop, {
      toValue: Platform.OS == 'ios' ? perfectSize(50) : perfectSize(40),
      duration: 1000,
      useNativeDriver: false,
      easing: Easing.elastic(Platform.OS == 'android' ? 1 : 1),
    }).start();
    setTimeout(() => {
      Animated.timing(this.errorModalTop, {
        toValue: -perfectSize(500),
        duration: 1000,
        useNativeDriver: false,
      }).start();
    }, 2000);
  };
  render() {
    const {
      stats,
      selectedFilter,
      selectedStartDateTimeStamp,
      selectedEndDateTimeStamp,
      error,
    } = this.state;
    return (
      <>
        <StatusBar
          translucent
          backgroundColor={colors.primaryBackgroundColor}
          barStyle="light-content"
        />
        <View style={styles.container}>
          {!stats && !error ? (
            <StatSkeleton />
          ) : (
            <>
              <Filter
                selectedFilter={selectedFilter}
                selectedStartDateTimeStamp={selectedStartDateTimeStamp}
                selectedEndDateTimeStamp={selectedEndDateTimeStamp}
                onPress={filterType => this.handleFilterPress(filterType)}
              />
              {error ? (
                <NoDataFound error={error} />
              ) : (
                <FlatList
                  data={stats}
                  numColumns={2}
                  scrollEnabled={false}
                  contentContainerStyle={{
                    flex: 1,
                    justifyContent: 'space-around',
                  }}
                  columnWrapperStyle={{
                    justifyContent: 'space-around',
                  }}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({item, index}) => {
                    return <CircularChart item={item} />;
                  }}
                />
              )}
            </>
          )}
        </View>
        <DatePicker
          errorModalTop={this.errorModalTop}
          visible={this.state.datePicker}
          handleCancelDate={() => this.handleCancelDate()}
          handleDateSubmit={() => this.handleDateSubmit()}
          onDateChange={this.onDateChange}
          rangeSelected={
            selectedStartDateTimeStamp && selectedEndDateTimeStamp
              ? true
              : false
          }
          startDate={getDisplayDate(selectedStartDateTimeStamp)}
          endDate={getDisplayDate(selectedEndDateTimeStamp)}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  return {LoginReducer: state.LoginReducer, AppReducer: state.AppReducer};
};

const mapDispatchToProps = {
  handleFetchStat: handleFetchStat,
};

export default connect(mapStateToProps, mapDispatchToProps)(Statistics);
