import { rabbitmqFactory } from './factories/pedido.factory';
import SetupServer from './server';

(async (): Promise<void> => {
  const PORT = process.env.PORT || '3333';
  new SetupServer(parseInt(PORT)).init();
  rabbitmqFactory();
})();
