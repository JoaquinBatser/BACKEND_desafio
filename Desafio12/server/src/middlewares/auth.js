export default function auth(req, res, next) {
  console.log(req.session)
  console.log(req.user)
  if (req.session && req.session.role === 'admin') return next()
  else return res.sendStatus(401)
}
