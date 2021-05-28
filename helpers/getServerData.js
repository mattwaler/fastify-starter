const User = require('../models/User')

module.exports = async function getServerData(request) {
  const session = request.session.get('session')
  let data = {
    devMode: process.env.NODE_ENV !== 'production'
  }
  if (session) {
    const user = await User.findById(session.id)
    data = { ...data, user }
  }
  return {
    data,
    session,
  }
}
