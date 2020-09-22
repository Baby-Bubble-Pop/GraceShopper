const isAdminMiddleware = (req, res, next) => {
  console.log(req.session.user)
  const currentUser = req.user
  if (currentUser && currentUser.role === 'admin') {
    next()
  } else {
    const error = new Error(`${currentUser}`)
    error.status = 401
    next(error)
  }
}

module.exports = isAdminMiddleware
