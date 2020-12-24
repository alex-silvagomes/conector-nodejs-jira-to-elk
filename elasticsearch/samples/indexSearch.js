// promise API
const result = await client.search({
    index: 'my-index',
    from: 20,
    size: 10,
    body: { foo: 'bar' }
  }, {
    ignore: [404],
    maxRetries: 3
  })
  
  // callback API
  client.search({
    index: 'my-index',
    from: 20,
    size: 10,
    body: { foo: 'bar' }
  }, {
    ignore: [404],
    maxRetries: 3
  }, (err, result) => {
    if (err) console.log(err)
  })