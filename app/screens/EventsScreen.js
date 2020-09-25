import React, {useState, useLayoutEffect} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import firestore from '@react-native-firebase/firestore';

import Header from '../components/Header';
import Event from '../components/Event';

export default function EventsScreen({navigation}) {
  const [events, setEvents] = useState([]);
  const [noEvents, setNoEvents] = useState(false);

  useLayoutEffect(() => {
    async function getEvents() {
      const querySnapshot = await firestore().collection('events').get();
      if (
        querySnapshot === null ||
        querySnapshot.size === 0 ||
        querySnapshot.empty
      ) {
        setNoEvents(true);
        return null;
      }

      try {
        const tempEvents = [];
        var count = 0;
        querySnapshot.forEach(function (doc) {
          tempEvents.push({
            data: doc.data(),
            id: count,
            ref: doc.ref,
          });
          count++;
        });
        setEvents(tempEvents);
      } catch (error) {
        Alert.alert('Error', 'Error retrieving events');
      }
    }
    getEvents();
  }, []);

  const selectEvent = (param) => {
    console.log(param);
    // navigation.navigate('Event', {
    //   screen: 'Event',
    //   params: {
    //     event: events[index],
    //   },
    // });
  };

  return (
    <View style={styles.container}>
      <Header title={'Events'} backButton={false} />
      {!noEvents && (
        <FlatList
          style={styles.eventList}
          data={events.sort((a, b) => {
            let date1 = new Date(a.data.startDate);
            let date2 = new Date(b.data.startDate);
            return date1.getTime() - date2.getTime();
          })}
          renderItem={({item, index}) => (
            <TouchableOpacity onPress={() => selectEvent(item.id.toString())}>
              <Event
                title={item.data.title}
                previewText={item.data.previewText}
                startDate={item.data.startDate}
                key={index}
              />
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id.toString()}
        />
      )}
      {noEvents && <Text style={styles.noEventsText}>No events found.</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#eee',
  },
  title: {
    fontSize: 48,
  },
  eventList: {
    height: '100%',
    padding: 10,
    backgroundColor: '#eee',
  },
  noEventsText: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 24,
  },
});
