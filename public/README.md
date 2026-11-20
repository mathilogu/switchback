# Switchback deploy
1. Push this folder to a GitHub repo.
2. Netlify > Add new site > Import from Git > pick the repo (no build command).
3. Site settings > Environment variables: add TREK_PASSPHRASE = your secret.
4. Redeploy. On each device tap the cloud button and enter the same passphrase.
CLI alternative: npm install, then netlify deploy --prod.
