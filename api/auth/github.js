export default async function handler(req, res) {
  const client_id = process.env.GITHUB_CLIENT_ID;
  const client_secret = process.env.GITHUB_CLIENT_SECRET;

  if (!client_id || !client_secret) {
    return res.status(500).send('GitHub OAuth not configured. Set GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in Vercel Environment Variables.');
  }

  const { code, state } = req.query;

  // Generate cryptographically secure state if not provided
  const generatedState = state || generateSecureState();
  
  // Store state in secure, httpOnly cookie for validation on callback
  const stateCookie = `oauth_state=${generatedState}; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=600`;
  res.setHeader('Set-Cookie', stateCookie);

  // Step 1: If no code, redirect to GitHub OAuth
  if (!code) {
    const githubAuthUrl = new URL('https://github.com/login/oauth/authorize');
    const redirectUri = getRedirectUri(req);
    
    githubAuthUrl.searchParams.set('client_id', client_id);
    githubAuthUrl.searchParams.set('redirect_uri', redirectUri);
    githubAuthUrl.searchParams.set('scope', 'read:user user:email'); // Reduced scope - no repo access
    githubAuthUrl.searchParams.set('state', generatedState);
    githubAuthUrl.searchParams.set('allow_signup', 'true');
    
    return res.redirect(302, githubAuthUrl.toString());
  }

  // Step 2: Validate state parameter against cookie (CSRF protection)
  const cookieState = parseCookies(req.headers.cookie || '').oauth_state;
  if (!cookieState || cookieState !== state) {
    return res.status(400).send('Invalid OAuth state. Possible CSRF attack.');
  }

  // Clear the state cookie after validation
  res.setHeader('Set-Cookie', 'oauth_state=; Path=/; HttpOnly; Secure; SameSite=Lax; Max-Age=0');

  // Step 3: Exchange code for token
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

    // Return token to Decap CMS via postMessage with origin verification
    const origin = getOrigin(req);
    const html = `
      <!DOCTYPE html>
      <html>
        <body>
          <script>
            (function() {
              const allowedOrigin = '${origin}';
              function receiveMessage(event) {
                // Verify origin to prevent token theft via malicious iframe
                if (event.origin !== allowedOrigin) {
                  console.warn('PostMessage origin mismatch:', event.origin);
                  return;
                }
                if (event.data === 'authorize') {
                  event.source.postMessage({
                    type: 'authorization:github:success',
                    token: '${tokenData.access_token}',
                    provider: 'github'
                  }, allowedOrigin);
                  window.close();
                }
              }
              window.addEventListener('message', receiveMessage, false);
              window.opener.postMessage('authorize', allowedOrigin);
            })();
          </script>
        </body>
      </html>
    `;

    // Set CSP header for this response
    res.setHeader('Content-Security-Policy', "default-src 'none'; script-src 'self' 'unsafe-inline'; frame-ancestors 'self';");
    res.setHeader('Content-Type', 'text/html');
    res.send(html);
  } catch (error) {
    console.error('GitHub OAuth error:', error);
    // Don't leak error details in production
    const message = process.env.NODE_ENV === 'production' ? 'Authentication failed' : 'Authentication failed: ' + error.message;
    res.status(500).send(message);
  }
}

function generateSecureState() {
  // Generate 32 bytes of cryptographically secure random data
  const array = new Uint8Array(32);
  crypto.getRandomValues(array);
  return Array.from(array, byte => byte.toString(16).padStart(2, '0')).join('');
}

function getRedirectUri(req) {
  // Use Vercel's deployment URL or request origin
  const host = req.headers.host || 'izzyautobridge.vercel.app';
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  return `${protocol}://${host}/api/auth/github`;
}

function getOrigin(req) {
  const host = req.headers.host || 'izzyautobridge.vercel.app';
  const protocol = req.headers['x-forwarded-proto'] || 'https';
  return `${protocol}://${host}`;
}

function parseCookies(cookieHeader) {
  const cookies = {};
  if (!cookieHeader) return cookies;
  cookieHeader.split(';').forEach(cookie => {
    const [name, ...rest] = cookie.trim().split('=');
    if (name && rest.length) {
      cookies[name] = rest.join('=');
    }
  });
  return cookies;
}