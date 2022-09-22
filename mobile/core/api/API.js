const urlAPI = 'http://localhost:5000'
import AsyncStorage from '@react-native-async-storage/async-storage';

const getData = async () => {
   try {
      const value = await AsyncStorage.getItem('accessToken');
      if(value !== null) {
         return value;
      }
   } catch(e) {
      console.log(e);
   }
}

export const requestGetFriends = async () => {
   let response = await fetch(`${urlAPI}/getFriends`);
   if (response.ok) {
      return await response.json();
   } else {
      console.log(response);
      return 0;
   }
}

export const sendRequest = async (userSenderID, userRecieverID) => {
   let res = await fetch(`${urlAPI}/sendRequest`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({userSender: userSenderID, userReciever: userRecieverID})
   })
   if (res.ok) {
      const jsonRes = await res.json();
      alert(jsonRes);
      return jsonRes;
      console.log(response);
      return 0;
   }
}

export const requestFindFriends = async (emailUser) => {
   const token = await getData();
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
         const jsonRes = await res.json();
         return jsonRes;
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
