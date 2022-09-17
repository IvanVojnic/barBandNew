const urlAPI = 'http://localhost:5000'

export const requestGetFriends = async () => {
   let response = await fetch(`${urlAPI}/getFriends`);
   if (response.ok) {
      return await response.json();
   } else {
      console.log(response)
      return 0
   }
}

export const requestFindFriends = async (emailUser) => {
   let response = await fetch(`${urlAPI}/findFriend`, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify({email: emailUser})
   })
   if (response.ok) {
      console.log(response)
      alert(response)
      return await response.json();
   } else {
      console.log(response)
      return 0
   }
}

export const onLoggedIn = async (token) => {
   let response = await fetch(`${urlAPI}/private`, {
      method: 'GET',
      headers: {
         'Content-Type': 'application/json',
         'Authorization': `Bearer ${token}`,
      },
   })
   if (response.ok) {
      try {
         const jsonRes = await res.json();
         if (res.status === 200) {
            return jsonRes.message;
         }
      } catch (err) {
         console.log(err);
      }
   }
}
