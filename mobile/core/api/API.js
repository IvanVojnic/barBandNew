const urlAPI = 'http://localhost:5000'

export const requestGetFriends = async () => {
   let response = await fetch(`${urlAPI}/getFriends`)
   if (response.ok) {
      return await response.json();
   } else {
      console.log(response)
      return 0
   }
}

