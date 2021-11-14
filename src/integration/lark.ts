import axios from "axios";

interface messageBody {
  msg_type: string;
  text?: {
    content: string;
  }
}

class Lark {
  private webhook: string;

  constructor(webhook: string) {
    this.webhook = webhook;
  }

  private generateMessage(messageType: string, message: string): messageBody | null {
    switch (messageType) {
      case 'text':
        return {
          msg_type: 'text',
          text: {
            content: message
          }
        }
      default:
        return null;
    }
  }

  public sendMessage(messageType: string, message: string): Promise<void> {
    const body :messageBody | null = this.generateMessage(messageType, message);
    if (!body) {
      return Promise.reject(new Error('Unsupported message type'));
    }

    return axios.post(this.webhook, {
      data: body
    });
  }
}

export default Lark;
