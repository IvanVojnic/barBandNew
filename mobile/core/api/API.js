import PORT from '../../env.js'
const urlAPI = `http://localhost:${PORT}`
import AsyncStorage from '@react-native-async-storage/async-storage';

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

export const requestGetFriends = async () => {
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

export const requestFindFriends = async (emailUser) => {
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
         const jsonRes = await response.json();
         console.log(jsonRes);
         return jsonRes.checkAuth;
      } catch (err) {
         console.log(err);
      }
   }
}
