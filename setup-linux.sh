sudo apt-get install curl

# install NVM
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/master/install.sh | bash
# NOTE: close/open terminal
#       run `command -v nvm`
#       ensure it logs `nvm` to screen

# install *latest* node
nvm install node


# install pnpm
npm i -g pnpm

# install yarn
npm install --global yarn