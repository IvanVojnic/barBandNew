import PORT from '../../env.js'
const urlAPI = `http://localhost:${PORT}`
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAccessToken = async () => {
   try {
      const value = await AsyncStorage.getItem('accessToken');
      if(value !== null) {
         return value;
      }
   } catch(e) {
      console.log(e);
   }
}

export const getId = async () => {
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

export const acceptInvite = async (roomId, status) => {
   const userId = await getId();
   const token = await getAccessToken();
   const isAuth = await onLoggedIn(token);
   let res = await fetch(`${urlAPI}/acceptInvite`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({userId: userId, roomId: roomId, status: status})
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
         const jsonRes = await response.json();
         console.log(jsonRes);
         return jsonRes.checkAuth;
      } catch (err) {
         console.log(err);
      }
   }
}
