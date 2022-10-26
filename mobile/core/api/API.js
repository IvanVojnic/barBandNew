import PORT from '../../env.js'
const urlAPI = `http://localhost:${PORT}`
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
const getAccessToken = async () => {
   try {
      const value = await AsyncStorage.getItem('accessToken');
      if(value !== null) {
         return value;
      }
   } catch(e) {
      console.log(e);
   }
}

const getId = async () => {
   try {
      const value = await AsyncStorage.getItem('userId');
      if(value !== null) {
         return value;
      }
   } catch(e) {
      console.log(e);
   }
}

export const sendInvite = async (userFriendsList) => {
   const userId = await getId();
   const token = await getAccessToken();
   const isAuth = await onLoggedIn(token);
   let res = await fetch(`${urlAPI}/sendInvite`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({userSender: userId, friendsList: userFriendsList})
   })
   if (res.ok) {
      if(isAuth) {
         return await res.json();
      }
   }
}

export const acceptInvite = async (roomId) => {
   const userId = await getId();
   const token = await getAccessToken();
   const isAuth = await onLoggedIn(token);
   let res = await fetch(`${urlAPI}/acceptInvite`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({userId: userId, roomId: roomId})
   })
   if (res.ok) {
      if(isAuth) {
         return await res.json();
      }
   }
}

export const getRooms = async () => {
   const userId = await getId();
   const token = await getAccessToken();
   const isAuth = await onLoggedIn(token);
   let res = await fetch(`${urlAPI}/getRooms`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({userId: userId})
   })
   if (res.ok) {
      if(isAuth) {
         return await res.json();
      }
   }
}

export const acceptRequestFriends = async (id) => {
   const userId = await getId();
   const token = await getAccessToken();
   const isAuth = await onLoggedIn(token);
   console.log(id);
   let res = await fetch(`${urlAPI}/acceptFriendsRequest`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({userSender: id, userReceiver: userId})
   })
   if (res.ok) {
      if(isAuth) {
         return await res.json();
      }
   }
}

export const getNotifications = async () => {
   const userId = await getId();
   let response = await fetch(`${urlAPI}/getFriendsRequest`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({id: userId})
   });
   if (response.ok) {
      return await response.json();
   } else {
      console.log(response);
      return 0;
   }
   return 0;
}

export const getFriends = async () => {
   const userId = await getId();
   let response = await fetch(`${urlAPI}/getFriends`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({id: userId})
   });
   if (response.ok) {
      return await response.json();
   } else {
      console.log(response);
      return 0;
   }
}

export const sendRequest = async (userReceiverID) => {
   const userSenderID = await getId();
   const token = await getAccessToken();
   const isAuth = await onLoggedIn(token);
   let res = await fetch(`${urlAPI}/sendRequest`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({userSender: userSenderID, userReceiver: userReceiverID})
   })
   if (res.ok) {
      if(isAuth) {
         return await res.json();
      }
   }
}

export const findFriends = async (emailUser) => {
   const token = await getAccessToken();
   const isAuth = await onLoggedIn(token);
   let res = await fetch(`${urlAPI}/findFriend`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({email: emailUser})
   })
   if (res.ok) {
      if(isAuth){
         return await res.json();
      }
   }
}

export const onLoggedIn = async (token) => {
   let response = await fetch(`${urlAPI}/private`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
         'Authorization': `Bearer ${token}`,
      },
   })
   if (response.ok) {
      try {


        Notifications.setNotificationHandler({
            handleNotification: async () => ({
               shouldShowAlert: true,
               shouldPlaySound: false,
               shouldSetBadge: false,
            }),
         });

           function App() {
            const [expoPushToken, setExpoPushToken] = useState('');
            const [notification, setNotification] = useState(false);
            const notificationListener = useRef();
            const responseListener = useRef();

            useEffect(() => {
               registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

               notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
                  setNotification(notification);
               });

               responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
                  console.log(response);
               });

               return () => {
                  Notifications.removeNotificationSubscription(notificationListener.current);
                  Notifications.removeNotificationSubscription(responseListener.current);
               };
            }, []);


         }

         async function schedulePushNotification() {
            await Notifications.scheduleNotificationAsync({
               content: {
                  title: "You've got mail! 📬",
                  body: 'Here is the notification body',
                  data: { data: 'goes here' },
               },
               trigger: { seconds: 2 },
            });
         }

         async function registerForPushNotificationsAsync() {
            let pushToken;

            if (Platform.OS === 'android') {
               await Notifications.setNotificationChannelAsync('default', {
                  name: 'default',
                  importance: Notifications.AndroidImportance.MAX,
                  vibrationPattern: [0, 250, 250, 250],
                  lightColor: '#FF231F7C',
               });
            }

            if (Device.isDevice) {
               const { status: existingStatus } = await Notifications.getPermissionsAsync();
               let finalStatus = existingStatus;
               if (existingStatus !== 'granted') {
                  const { status } = await Notifications.requestPermissionsAsync();
                  finalStatus = status;
               }
               if (finalStatus !== 'granted') {
                  alert('Failed to get push token for push notification!');
                  return;
               }
               pushToken = (await Notifications.getExpoPushTokenAsync()).data;
               console.log(pushToken);
            } else {
               alert('Must use physical device for Push Notifications');
            }

             JSON.stringify(pushToken)
            return pushToken;
         }
           const sendToken = async () => {
            const token = await getAccessToken();
            const isAuth = await onLoggedIn(token);
            let res = await fetch(`${urlAPI}/private`, {
               method: 'POST',
               headers: {
                  'Content-Type': 'application/json;charset=utf-8',
               },
               body: JSON.stringify(pushToken)
            })
            if (res.ok) {
               if(isAuth){
                  return await res.json();
               }
            }
         }

         const jsonRes = await response.json();
         console.log(jsonRes);

         return jsonRes.checkAuth;
      } catch (err) {
         console.log(err);
      }
   }

}
