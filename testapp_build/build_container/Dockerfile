FROM ubuntu:16.04

RUN apt-get update && apt-get install -y curl vim

RUN curl -LO https://github.com/stedolan/jq/releases/download/jq-1.5/jq-linux64 \
  && chmod a+x jq-linux64 \
  && mv jq-linux64 /usr/local/bin/jq
  
# Install nodejs runtime
RUN curl -sL https://deb.nodesource.com/setup_14.x | bash -
RUN apt-get install -y nodejs

RUN mv /etc/vim/vimrc /etc/vim/vimrc.bak

WORKDIR /

# install Summon and the Summon-conjur provider
RUN curl -sSL https://raw.githubusercontent.com/cyberark/summon/master/install.sh \
      | env TMPDIR=$(mktemp -d) bash && \
    curl -sSL https://raw.githubusercontent.com/cyberark/summon-conjur/master/install.sh \
      | env TMPDIR=$(mktemp -d) bash

COPY secrets.yml webapp*.sh uid_entrypoint.sh index.js package.json /

RUN npm install

# setup entrypoint for default user
RUN chmod g=u /etc/passwd /*.sh /secrets.yml

# ENTRYPOINT [ "/uid_entrypoint.sh" ]
ENTRYPOINT [ "summon", "node", "/index.js" ]

USER 1001
EXPOSE 1234