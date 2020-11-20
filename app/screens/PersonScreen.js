import React from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  LogBox,
} from 'react-native';
import {Icon} from 'react-native-elements';
import Header from '../components/Header';

LogBox.ignoreLogs([
  'Non-serializable values were found in the navigation state',
]);

// define constants for actions
const ACTION_BAN = 0;
const ACTION_CHANGE_TYPE = 1;
// const ACTION_MAKE_LEADER = 2;
// const ACTION_MAKE_STAFF = 3;
// const ACTION_MAKE_DIRECTOR = 4;
// const ACTION_MAKE_STUDENT = 5;

export default function PersonScreen({route, navigation}) {
  const [isLoaded, setIsLoaded] = React.useState(false);
  var {person, header, isAdmin} = route.params;

  const [userType, setUserType] = React.useState('');
  //setUserType(person.data.type);

  React.useEffect(() => {
    async function setInitialType() {
      setUserType(person.data.type);
    }

    if (!isLoaded) {
      setInitialType();
      setIsLoaded(true);
    }
  }, [isLoaded, person, userType]);

  const [manageAccountVisible, setManageAccountVisible] = React.useState(false);
  const [manageArrow, setManageArrow] = React.useState('keyboard-arrow-down'); // down is default

  const downArrow = 'keyboard-arrow-down';
  const upArrow = 'keyboard-arrow-up';

  const toggleManageAccount = () => {
    setManageAccountVisible(!manageAccountVisible);
    if (manageArrow === downArrow) {
      setManageArrow(upArrow);
    } else {
      setManageArrow(downArrow);
    }
  };

  const writeUserType = (str) => {
    if (str === 'studentLeader') {
      return 'Student Leader';
    } else {
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
  };

  const updateUser = async (user, action, value) => {
    try {
      console.log('Email: ' + user.data.email);

      // first ask if they want to do it

      switch (action) {
        case ACTION_BAN:
          // this doesn't work but we don't have the functionality in the UI anyway
          user.ref
            .update({
              banned: value,
            })
            .then(function () {
              if (value) {
                Alert.alert('User successfully banned.');
              } else {
                Alert.alert('User successfully unbanned.');
              }
            })
            .catch(function (error) {
              Alert.alert('Error updating document: ', error);
            });
          break;
        case ACTION_CHANGE_TYPE:
          Alert.alert(
            '',
            'Are you sure you want to make this user a ' +
              writeUserType(value) +
              '?',
            [
              {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
              },
              {
                text: 'OK',
                onPress: () =>
                  user.ref
                    .update({
                      type: value,
                    })
                    .then(function () {
                      Alert.alert(
                        'User successfully updated to ' +
                          writeUserType(value) +
                          '!',
                      );
                      setUserType(value);
                    })
                    .catch(function (error) {
                      console.log('Error: ' + error);
                      Alert.alert('Error updating document: ', error);
                    }),
              },
            ],
            {cancelable: false},
          );

          //person.data.type = value;
          //var tempPerson = person;

          break;
        default:
          console.log('Invalid action provided: ' + action);
        // what error to display to the user? probably none
      }
    } catch (error) {
      Alert.alert('Error', 'Some bad error here: ' + error);
    }
  };

  const createNewChat = () => {
    console.log('Creating new chat');
  };

  return (
    <View contentContainerStyle={styles.container}>
      <Header navigation={navigation} title={header} backButton={true} isAdmin={isAdmin} />

      <ScrollView style={[styles.body, isAdmin ? styles.whiteBackground : styles.grayBackground]}>
        <Image source={{uri: person.data.photoURL}} style={styles.profilePic} />

        <Text style={styles.personName}>{person.data.displayName}</Text>

        <Text style={styles.personInfo}>{writeUserType(userType)}</Text>
        <Text style={styles.personInfo}>Class of {person.data.gradYear}</Text>

        {!isAdmin && (
          <TouchableOpacity
            onPress={() => createNewChat()}
            style={styles.blueButton}>
            <Text style={styles.buttonText}>New Chat</Text>
          </TouchableOpacity>
        )}

        {isAdmin && (
        <TouchableOpacity
          onPress={() => toggleManageAccount()}
          style={styles.blueButton}>
          <Text style={styles.buttonText}>Manage Account</Text>
        </TouchableOpacity>
        )}

        {manageAccountVisible && (
          <View>
            <TouchableOpacity
              onPress={() => updateUser(person, ACTION_CHANGE_TYPE, 'student')}
              style={styles.whiteButton}>
              <Text style={styles.blackButtonText}>Make Student</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() =>
                updateUser(person, ACTION_CHANGE_TYPE, 'studentLeader')
              }
              style={styles.whiteButton}>
              <Text style={styles.blackButtonText}>Make Student Leader</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => updateUser(person, ACTION_CHANGE_TYPE, 'staff')}
              style={styles.whiteButton}>
              <Text style={styles.blackButtonText}>Make Staff</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => updateUser(person, ACTION_CHANGE_TYPE, 'director')}
              style={styles.whiteButton}>
              <Text style={styles.blackButtonText}>Make Director</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    flexDirection: 'column',
  },
  headerContainer: {
    backgroundColor: '#eee',
    display: 'flex',
    flexDirection: 'row',
  },
  body: {
    //backgroundColor: 'white',
    height: '100%',
  },
  arrowIcon: {
    //flexStart: 50,
  },
  backButton: {
    marginTop: 37,
    marginStart: 15,
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  userList: {
    height: '100%',
    backgroundColor: 'white',
  },
  title: {
    flex: 4,
    marginTop: 40,
    marginBottom: 25,
    fontSize: 22,
    fontWeight: '600',
    textAlign: 'center',

  },
  empty: {
    flex: 1,
  },
  profilePic: {
    width: 150,
    height: 150,
    alignSelf: 'center',
    marginTop: 30,
    borderRadius: 8,
  },
  personName: {
    color: '#3ab5e6',
    fontSize: 32,
    alignSelf: 'center',
    marginBottom: 10,
    fontFamily: 'OpenSans-Regular',
  },
  personInfo: {
    //color: '#3ab5e6',
    fontSize: 16,
    alignSelf: 'center',
    marginBottom: 5,
    fontFamily: 'OpenSans-Regular',
  },
  infoPanel: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  managePanel: {
    flex: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blueButton: {
    backgroundColor: '#3ab5e6',
    width: '85%',
    alignSelf: 'center',
    borderRadius: 10,
    marginTop: 30,
    padding: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 18,
    padding: 10,
    fontWeight: 'bold',
    fontFamily: 'OpenSans-Bold',
  },
  blackButtonText: {
    color: '#000',
    textAlign: 'center',
    fontSize: 16,
    padding: 10,
    fontWeight: '600',
    fontFamily: 'OpenSans-SemiBold',
  },
  whiteButton: {
    backgroundColor: '#fff',
    width: '85%',
    alignSelf: 'center',
    borderWidth: 1.3,
    borderColor: '#3939391A',
    paddingVertical: 8,
  },
  grayBackground: {
    backgroundColor: '#eee',
  },
  whiteBackground: {
    backgroundColor: 'white',
  },
});
