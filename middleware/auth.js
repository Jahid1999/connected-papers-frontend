export default function ({ app, route, store, redirect }) {
  const user = JSON.parse(localStorage.getItem('user'))
  store.commit('storeUser', user)

  if (route.name === 'login' && user && user.token) {
    return redirect('/')
  } else if (route.name === 'login') {
    return
  } else if (route.name === 'register') {
    return
  }

  if (!user || !user.token) {
    return redirect('/login')
  }
}
