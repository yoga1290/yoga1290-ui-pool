FROM node:21-alpine
#-alpine

LABEL "com.github.actions.name"="Hello World"
LABEL "com.github.actions.description"="Write arguments to the standard output"
LABEL "com.github.actions.icon"="mic"
LABEL "com.github.actions.color"="purple"

LABEL "repository"="$GITHUB_REPO"
LABEL "homepage"="http://github.com/actions"
LABEL "maintainer"="yoga1290 <yoga1290@github.com>"

WORKDIR  /usr/app

ADD build-ghpage.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]

