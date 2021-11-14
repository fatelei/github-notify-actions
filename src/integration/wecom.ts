import axios from 'axios'

interface messageBody {
  msgType: string
  text?: {
    content: string
  }
}

class Wecom {
  static supportMessageType: string[] = ['text']
  private webhook: string

  constructor(webhook: string) {
    this.webhook = webhook
  }

  private generateMessage(
    messageType: string,
    message: string
  ): messageBody | null {
    switch (messageType) {
      case 'text':
        return {
          msgType: 'text',
          text: {
            content: message
          }
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

export default Wecom
