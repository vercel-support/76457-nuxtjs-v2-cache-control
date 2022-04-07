export default (req, res, next) => {
  res.setHeader('_test2', 'Bend-Examine-Final-Famous-0')
  res.setHeader('x-foo', 'bar')
  res.setHeader('_test', 'Bend-Examine-Final-Famous-0')
  console.log(res.getHeaders()) 
  next()
}