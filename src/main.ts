import * as core from '@actions/core'
import { Lark, Wecom } from './integration'


const getIntegration = (): Lark | Wecom | null => {
  const integration: string = core.getInput('integration');
  const webhook: string = core.getInput('webhook');
  core.debug(`get integration ${integration} with webhook ${webhook}`)

  switch (integration) {
    case "lark":
      return new Lark(webhook);
    case "wecom":
      return new Wecom(webhook);
    default:
      return null;
  }
}

async function run(): Promise<void> {
  try {
    const integration: Lark | Wecom | null = getIntegration();
    if (!integration) {
      core.setFailed("No integration specified");
      return;
    }

    const messageType: string = core.getInput('messageType');
    const content: string = core.getInput('content');
    core.debug(`send message ${messageType} with content ${content}`)
    await integration.sendMessage(messageType, content);
    core.setOutput('send_webhook', new Date().toTimeString())
  } catch (error) {
    if (error instanceof Error) core.setFailed(error.message)
  }
}

run()
