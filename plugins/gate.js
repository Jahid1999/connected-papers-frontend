export default (context, inject) => {
  const checkIfUserHasPermission = function (permission) {
    return true
  }

  inject('hasPermission', checkIfUserHasPermission)
  context.$hasPermission = checkIfUserHasPermission
}
