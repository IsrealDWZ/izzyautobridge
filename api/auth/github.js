export default async function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return res.status(500).send('GitHub OAuth not configured. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Vercel Environment Variables.');
  }

  const { code, state } = req.query;

  // Step 1: If no code, redirect to GitHub OAuth
  if (!code) {
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    githubAuthUrl.searchParams.set('client_id', client_id);
    githubAuthUrl.searchParams.set('redirect_uri', 'https://izzyautobridge.vercel.app/api/auth/github');
    githubAuthUrl.searchParams.set('scope', 'repo');
    githubAuthUrl.searchParams.set('state', state || 'decap-cms');
    githubAuthUrl.searchParams.set('allow_signup', 'true');
    
    return res.redirect(302, githubAuthUrl.toString());
  }

  // Step 2: Exchange code for token
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

    // Return token to Decap CMS via postMessage
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
    res.status(500).send('Authentication failed: ' + error.message);
  }
}