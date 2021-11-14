import axios from 'axios'

interface messageBody {
  title?: string
  text?: string
}

class Slack {
  private webhook: string

  constructor(webhook: string) {
    this.webhook = webhook
  }

  private generateMessage(
    messageType: string,
    content: string
  ): messageBody | null {
    switch (messageType) {
      case 'text':
        return {
          text: content
        }
      default:
        return null
    }
  }

  async sendMessage(
    messageType: string,
    title: string,
    content: string
  ): Promise<void> {
    const body: messageBody | null = this.generateMessage(messageType, content)
    if (!body) {
      return Promise.reject(new Error('Unsupported message type'))
    }

    return axios.post(this.webhook, body)
  }
}

export default Slack
