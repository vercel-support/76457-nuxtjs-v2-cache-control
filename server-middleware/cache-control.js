export default (req, res, next) => {
  res.setHeader(
    'cache-control',
    's-maxage=86400, stale-while-revalidate'
  )
  res.setHeader('x-foo', 'bar')
  next()
}