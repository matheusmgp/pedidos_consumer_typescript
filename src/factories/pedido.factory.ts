import { Request, Response } from 'express';
import PedidoController from '../controllers/pedido.controller';
import PedidoRepository from '../repositories/pedido.repository';
import PedidoService from '../services/pedido.service';
import { SetupRabbitMq } from '../services/rabbitmq/consumer';

export const pedidoFactory = (req: Request, res: Response): any => {
  const repository = new PedidoRepository();
  const service = new PedidoService(repository);
  const controller = new PedidoController(service);
  return controller.handleRequest(req, res);
};

export const rabbitmqFactory = () => {
  const repository = new PedidoRepository();
  const service = new PedidoService(repository);
  const rabbitmq = new SetupRabbitMq(service);
  rabbitmq.init();
};
