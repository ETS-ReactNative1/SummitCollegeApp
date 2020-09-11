import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {Icon} from 'react-native-elements';

export default function Header({navigation, title, backButton}) {
  return (
    <View style={styles.headerContainer}>
      {backButton && (
        <>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}>
            <Icon name="keyboard-arrow-left" type="material" size={35} />
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
    marginTop: 42,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  title: {
    flex: 4,
    marginTop: 45,
    marginBottom: 25,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',
  },
  empty: {
    flex: 1,
  },
});
