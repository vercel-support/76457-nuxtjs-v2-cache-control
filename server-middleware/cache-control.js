export default (req, res, next) => {
  res.setHeader(
    'cache-control',
    's-maxage=86400, stale-while-revalidate'
  )
  res.setHeader('x-foo', 'bar')
  res.setHeader('_test', 'Bend-Examine-Final-Famous-0')
  console.log(res.getHeaders()) 
  next()
}