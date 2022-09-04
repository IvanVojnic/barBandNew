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
    /*.then(res => res.json())
    .then(
        (result) => {
          /*  if ("error" in result) {
                return {error: result}
            } else if (result === 0) {
                return {noFriends: 0}
            } else {
                return result
            //}
        },*/
  //  )}
