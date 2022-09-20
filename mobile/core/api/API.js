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

export const requestFindFriends = async (emailUser) => {
   const token = await getData();
   const isAuth = await onLoggedIn(token);
   let res = await fetch(`${urlAPI}/findFriend`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify({email: emailUser})
   }).then(async res => {
      try{
            if (res.ok) {
               if(isAuth){
                  console.log(res);
                  alert(res);
                  return await res.json();
               }
            }
      } catch (err) {
         console.log(err);
      }
   }).catch(err => {
      console.log(err);
   });
  /* if (response.ok) {
      console.log(response)
      alert(response)
      return await response.json();
   } else {
      console.log(response)
      return 0
   }*/
}

export const onLoggedIn = async (token) => {
   let response = await fetch(`${urlAPI}/private`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json;charset=utf-8',
         'Authorization': `Bearer ${token}`,
      },
   }).then(async response => {
      if (response.ok) {
         try {
            const jsonRes = await response.json();
            return jsonRes.checkAuth
         } catch (err) {
            console.log(err);
         }
      }
   }).catch(err => {
      console.log(err);
   });
}
