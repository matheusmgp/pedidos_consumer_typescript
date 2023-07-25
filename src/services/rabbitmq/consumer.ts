import PedidoService from '../pedido.service';
import client, { Connection, Channel } from 'amqplib';

export class SetupRabbitMq {
  constructor(private readonly service: PedidoService) {}

  private connection: Connection | undefined;
  private channel: Channel | undefined;
  private QUEUE: string = 'pedidos';

  public async init(): Promise<void> {
    await this.getConnection();
    await this.createChannel();
    await this.channel?.assertQueue(this.QUEUE);
    this.setConsumer();
  }
  public sendMessage(payload: any): void {
    const message = JSON.stringify(payload);
    this.channel?.sendToQueue(this.QUEUE, Buffer.from(Buffer.from(message)));
  }
  private async getConnection() {
    this.connection = await client.connect(
      `amqp://${process.env.RABBITMQ_USER}:${process.env.RABBITMQ_PASS}@${process.env.RABBITMQ_HOST}:${process.env.RABBITMQ_PORT}`
    );
  }
  private async createChannel() {
    this.channel = await this.connection?.createChannel();
  }
  private setConsumer() {
    try {
      this.channel?.consume(
        this.QUEUE,
        (message) => {
          if (message) {
            const content = message.content.toString();
            console.log(`[x] Mensagem recebida: ${content}`);
            // Adicione aqui o processamento da mensagem recebida
            this.channel?.ack(message); // Confirma o recebimento da mensagem
            this.service.handleMessage(JSON.parse(message.content.toString()));
          }
        },
        { noAck: false } // Configura o modo de confirmação manual (ack)
      );
    } catch (error) {
      console.error('Erro no consumidor:', error);
    }
  }
}
