import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';

export default function Header({navigation, title, backButton, isAdmin}) {
  return (
    <View style={[styles.headerContainer, isAdmin ? styles.grayBackground : styles.whiteBackground]}>
      {backButton && (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="chevron-left" type="feather" size={35} />
          </TouchableOpacity>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.empty} />
        </>
      )}
      {!backButton && (
        <>
          <Text style={styles.empty} />
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.empty} />
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: 'white',
    display: 'flex',
    flexDirection: 'row',
  },

  backButton: {
    marginTop: 35,
    flex: 1,
  },
  title: {
    flex: 4,
    marginTop: 35, // was 45; need to adjust for iOS somehow
    marginBottom: 35, // was 25
    fontSize: 22,
    textAlign: 'center',
    fontFamily: 'OpenSans-Regular',
    //paddingEnd: 15, // not a good fix....
  },
  empty: {
    flex: 1,
  },
});