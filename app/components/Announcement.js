/* eslint-disable curly */
/* eslint-disable react-native/no-inline-styles */
import React, {useState, useEffect} from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';
import AppContext from '../components/AppContext.js';

import {summitBlue} from '../assets/colors';

export default function Announcement({navigation, timestamp, title, body}) {
  // const {isHidden, setIsHidden} = useState(hidden);
  const context = React.useContext(AppContext);
  const {hiddenAnnouncements, setHiddenAnnouncements} = useState([]);
  // const getMonth = (timestamp) => {
  //   let month = '';
  //   let m = new Date(timestamp.seconds * 1000).getMonth() + 1; // the +1 is necessary.
  //   if (m === 1) month = 'Jan';
  //   else if (m === 2) month = 'Feb';
  //   else if (m === 3) month = 'Mar';
  //   else if (m === 4) month = 'Apr';
  //   else if (m === 5) month = 'May';
  //   else if (m === 6) month = 'Jun';
  //   else if (m === 7) month = 'Jul';
  //   else if (m === 8) month = 'Aug';
  //   else if (m === 9) month = 'Sep';
  //   else if (m === 10) month = 'Oct';
  //   else if (m === 11) month = 'Nov';
  //   else if (m === 12) month = 'Dec';
  //   return month;
  // };

  // const getDate = (timestamp) => {
  //   return new Date(timestamp.seconds * 1000).getDate();
  // };

  // const getHours = (timestamp) => {
  //   hours = new Date(timestamp.seconds * 1000).getHours();
  //   if (hours > 12) {
  //     hours -= 12;
  //   }
  //   return twoDigits(hours)
  // };

  // const getMinutes = (timestamp) => {
  //   return twoDigits(new Date(timestamp.seconds * 1000).getMinutes());
  // };

  // const getAMPM = (timestamp) => {
  //   hours = new Date(timestamp.seconds * 1000).getHours();
  //   if (hours >= 12 && hours < 24) {
  //     return "PM"
  //   }
  //   else {
  //     return "AM"
  //   }
  // };

  // const isToday = (timestamp) => {
  //   let today = new Date().toDateString();
  //   let announcementDate = new Date(timestamp.seconds * 1000).toDateString();
  //   return today == announcementDate;
  // };

  // const twoDigits = (num) => {
  //   if (num < 10) return "0" + num;
  //   else return num;
  // }

  return (
    <>
      <View style={styles.infoContainer}>
        <Text numberOfLines={1} style={styles.announcementTitle}>
          {title}
        </Text>
      </View>
      {/*isToday(timestamp)
      ? <View style={styles.dateContainer}>
        <Text style={styles.hourText}>{getHours(timestamp)}:{getMinutes(timestamp)}{getAMPM(timestamp)}</Text>
      </View>
      : <View style={styles.dateContainer}>
        <Text style={styles.monthText}>{getMonth(timestamp)} {getDate(timestamp)}</Text>
      </View>
    */}
      {/* <TouchableOpacity
        onPress={() => {
          if (!context.hiddenAnnouncements) context.hiddenAnnouncements = [];
          context.hiddenAnnouncements.push({title});
        }}>
        <Icon
          name="trash-2"
          type="feather"
          color={summitBlue}
          style={{flex: 1}}
          size={28}
        />
      </TouchableOpacity> */}
      <Icon
        name="trash-2"
        type="feather"
        color={summitBlue}
        style={{flex: 1}}
        size={28}
      />
    </>
  );
}

const styles = StyleSheet.create({
  dateContainer: {
    alignItems: 'center',
    marginLeft: 13,
  },
  monthText: {
    fontSize: 12,
    fontWeight: '300',
    color: 'darkgray',
  },
  dayText: {
    fontSize: 12,
    fontWeight: '300',
    color: 'darkgray',
  },
  hourText: {
    fontSize: 12,
    fontWeight: '300',
    color: 'darkgray',
  },
  infoContainer: {
    textAlign: 'left',
    width: 250,
    flex: 5,
  },
  announcementTitle: {
    fontSize: 16,
    fontFamily: 'OpenSans-SemiBold',
    paddingRight: 30,
  },
});