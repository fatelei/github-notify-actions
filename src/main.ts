import * as core from '@actions/core'
import {Lark, Slack, Wecom} from './integration'

const getIntegration = (
  integration: string,
  webhook: string
): Lark | Slack | Wecom | null => {
  switch (integration) {
    case 'lark':
      core.debug(`init ${integration} instance`)
      return new Lark(webhook)
    case 'slack':
      core.debug(`init ${integration} instance`)
      return new Slack(webhook)
    case 'wecom':
      core.debug(`init ${integration} instance`)
      return new Wecom(webhook)
    default:
      core.debug(`init ${integration} instance`)
      return null
  }
}

async function run(): Promise<void> {
  try {
    const integration: string = core.getInput('integration')
    const webhook: string = core.getInput('webhook')
    const cli: Lark | Slack | Wecom | null = getIntegration(
      integration,
      webhook
    )
    if (!cli) {
      core.setFailed('No integration specified')
      return
    }

    const messageType: string = core.getInput('messageType')
    const title: string = core.getInput('title') || ''
    const content: string = core.getInput('content')
    core.debug(`send message ${messageType} with content ${content}`)
    await cli.sendMessage(messageType, title, content)
    core.setOutput('send_webhook', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
