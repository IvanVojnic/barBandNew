const urlAPI = 'http://localhost:3000'

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
