import axios from 'axios';

interface messageBody {
  msgType: string;
  text?: {
    content: string;
  }
}

class Wecom {
  static supportMessageType: string[] = ['text'];
  private webhook: string;

  constructor(webhook: string) {
    this.webhook = webhook;
  }

  private generateMessage(messageType: string, message: string): messageBody | null {
    switch (messageType) {
      case 'text':
        return {
          msgType: 'text',
          text: {
            content: message
          }
        }
      default:
        return null;
    }
  }

  public sendMessage(messageType: string, message: string): Promise<any> {
    const body :messageBody | null = this.generateMessage(messageType, message);
    if (!body) {
      return Promise.reject(new Error('Unsupported message type'));
    }
    return axios.post(this.webhook, {
      data: body
    });
  }
}

export default Wecom;
