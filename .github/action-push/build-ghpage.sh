ls;
cd /usr
git clone https://$REPO_USERNAME:$GITHUB_TOKEN@$REPO_URL app #TODO
cd /usr/app;
ls;

npm i
npm run build;
git add docs;
git commit -m "ghpage";
git push;
