export default async function handler(req, res) {
  const { code, state } = req.query;

  if (!code) {
    return res.status(400).send('Missing code parameter');
  }

  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return res.status(500).send('GitHub OAuth not configured');
  }

  try {
    const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        client_id,
        client_secret,
        code,
        state,
      }),
    });

    const tokenData = await tokenResponse.json();

    if (tokenData.error) {
      return res.status(400).send(tokenData.error_description || 'OAuth failed');
    }

    // Return the token to the CMS via postMessage
    const html = `
      <!DOCTYPE html>
      <html>
        <body>
          <script>
            (function() {
              function receiveMessage(event) {
                if (event.data === 'authorize') {
                  window.opener.postMessage({
                    type: 'authorization:github:success',
                    token: '${tokenData.access_token}',
                    provider: 'github'
                  }, event.origin);
                  window.close();
                }
              }
              window.addEventListener('message', receiveMessage, false);
              window.opener.postMessage('authorize', '*');
            })();
          </script>
        </body>
      </html>
    `;

    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    res.status(500).send('Authentication failed');
  }
}