import 'gun/lib/mobile'
import Gun from 'gun/gun'
import SEA from 'gun/sea'

const useGun = () => {
  const gun = Gun({
    peers: ['http://gunjs.herokuapp.com/gun']
  })
  //App namespace
  const app = gun.get('jot')
  const user = gun.user()
  return { gun, app, user, SEA }
}

export default useGun