import { GluegunCommand } from 'gluegun'

const command: GluegunCommand = {
  name: 'builder',
  run: async toolbox => {
    const { print } = toolbox

    print.info('Welcome to your Builder CLI')
  }
}

module.exports = command
