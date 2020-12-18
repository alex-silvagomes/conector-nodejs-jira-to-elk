// This code sample uses the 'node-fetch' library:
// https://www.npmjs.com/package/node-fetch
const fetch = require('node-fetch');

fetch('https://your-domain.atlassian.com/rest/api/3/issue/{issueIdOrKey}/transitions', {
    method: 'GET',
    headers: {
      'Authorization': `Basic ${Buffer.from(
        'email@example.com:<api_token>'
      ).toString('base64')}`,
      'Accept': 'application/json'
    }
  })
  .then(response => {
    console.log(
      `Response: ${response.status} ${response.statusText}`
    );
    return response.text();
  })
  .then(text => console.log(text))
  .catch(err => console.error(err));