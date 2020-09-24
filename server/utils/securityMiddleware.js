const isUser = (req, res, next) => {
  if (req.user) {
    next()
  } else {
    const err = new Error('You must be logged in to access this!')
    err.status = 403
    next(err)
  }
}

const isAdmin = (req, res, next) => {
  if (req.user.role === 'admin') {
    next()
  } else {
    const err = new Error('You must be an admin to access this!')
    err.status = 403
    next(err)
  }
}

const isSameUserOrAdmin = (req, res, next) => {
  if (req.user.id === Number(req.params.id) || req.user.role === 'admin') {
    next()
  } else {
    const err = new Error('You must be this user or an admin to access this!')
    err.status = 403
    next(err)
  }
}

module.exports = {isUser, isAdmin, isSameUserOrAdmin}
