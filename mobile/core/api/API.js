import PORT from '../../env.js'
const urlAPI = `http://192.168.1.29:${PORT}`
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
      console.log("get id")
      const value = await AsyncStorage.getItem('userId');
      console.log("value")
      console.log(value)
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
   console.log("get N1")
   const userId = await getId();
   console.log("get N2")
   console.log(userId)
   let response = await fetch(`${urlAPI}/getFriendsRequest`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({id: userId})
   });
   console.log("get N3")
   console.log(response)
   if (response.ok) {
      return await response.json();
   } else {
      console.log(response);
      return 0;
   }
   return 0;
}

export const getFriends = async () => {
   console.log("get f req 1")
   const userId = await getId();
   console.log("get f req 1 user id")
   console.log(userId)
   try {
      console.log("get friends api call")
      let response = await fetch(`${urlAPI}/getFriends`, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json;charset=utf-8',
         },
         body: JSON.stringify({id: userId})
      });
      console.log("get f response")
      console.log(response)
      if (response.ok) {
         return await response.json();
      } else {
         console.log(response);
         return 0;
      }
   } catch(error) {
      console.log("get friends api error" + error)
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
   console.log("onLoggedin func called")
   let response = await fetch(`${urlAPI}/private`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
         'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({verify:"true"})
   })
   try {
      if (response.ok) {
         console.log("onLoggedIn response ok, status 200")
         return response
         /*const result = await response.json()
         console.log("onLogged response");
         console.log(result);
         return result;*/
      } else {
         console.log("onLoggedIn response NOT ok, look at status")
         return false;
      }
   } catch (err) {
      console.log("onLoggedErr");
      console.log(err);
      return false;
   }
}
