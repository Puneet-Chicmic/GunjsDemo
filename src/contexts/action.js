import useGun from '../hooks/useGun'
const { user, SEA,gun } = useGun()
export async function authUser (dispatch, payload) {
    console.log('dispatch', dispatch)
    console.log('payload', payload)
    user.auth(payload.username,payload.password,(res)=>{
      console.log(res,"res is this");
      alert("User is Authenticated!")
     console.log(user.is,"user.is");
    if (user.is) {
      console.log(user,"USERUSER!");
      dispatch({
        type: 'AUTH',
        payload: {
          username: payload.username,
          // key: JSON.stringify(user.is)
          password:payload.password
        }
      })
      // user
      //   .get('profile')
      //   .get('name')
      //   .on(username => {
      //     // Update the username and key in our auth context
      //     // console.log(username,"username");
      //     dispatch({
      //       type: 'AUTH',
      //       payload: {
      //         username: username,
      //         // key: JSON.stringify(user.is)
      //         password:payload.password
      //       }
      //     })
      //   })
    }
    })
   
  }
  export async function createUser (dispatch, payload) {
    console.log('dispatch', dispatch)
    console.log('payload', payload)
    user.create(payload.username,payload.password,(res)=>{
      alert("Congratulations!")
      // authUser(dispatch, { password:payload.password, username: payload.username })
      gun
        .get('profile')
        .get('name')
        .put(payload.username)

        dispatch({
          type: 'AUTH',
          payload: {
            username:payload.username,
            // key: JSON.stringify(user.is)
            password:payload.password
          }
        })
      
    })
    // var key = await SEA.pair()
    // console.log(key,"KEY ====");
    
  }
  
  export async function logoutUser (dispatch) {
    console.log('dispatch', dispatch)
    user.leave()
    // Resets the username and key in our auth context
    dispatch({ type: 'AUTH_LOGOUT' })
  }