/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import {View} from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';
import {perfectSize} from '../../theme';

export default function DashboardSkeleton() {
  return (
    <SkeletonPlaceholder
      backgroundColor="#34363C"
      speed={500}
      highlightColor="#2D302D">
      <View
        style={{
          flex: 1,
          padding: perfectSize(23),
          height: '100%',
          width: '100%',
          justifyContent: 'center',
        }}>
        <View
          style={{
            height: perfectSize(50),
            width: perfectSize(200),
            borderRadius: perfectSize(5),
          }}
        />
        <View
          style={{
            flexDirection: 'row',
            marginTop: '5%',
            justifyContent: 'space-around',
          }}>
          <View
            style={{
              height: perfectSize(40),
              width: perfectSize(140),
              borderRadius: perfectSize(5),
            }}
          />
          <View
            style={{
              height: perfectSize(40),
              width: perfectSize(140),
              borderRadius: perfectSize(5),
            }}
          />
        </View>
        <View
          style={{
            height: perfectSize(150),
            width: '100%',
            borderRadius: perfectSize(5),
            marginTop: '5%',
          }}
        />
        <View
          style={{
            height: perfectSize(20),
            width: '100%',
            borderRadius: perfectSize(5),
            marginTop: '5%',
          }}
        />
        <View
          style={{
            height: perfectSize(150),
            width: '100%',
            borderRadius: perfectSize(5),
            marginTop: '5%',
          }}
        />
        <View
          style={{
            height: perfectSize(20),
            width: '100%',
            borderRadius: perfectSize(5),
            marginTop: '5%',
          }}
        />
        <View
          style={{
            height: perfectSize(70),
            width: '100%',
            borderRadius: perfectSize(5),
            marginTop: '5%',
          }}
        />
        <View
          style={{
            height: perfectSize(70),
            width: '100%',
            borderRadius: perfectSize(5),
            marginTop: '5%',
          }}
        />
      </View>
    </SkeletonPlaceholder>
  );
}
