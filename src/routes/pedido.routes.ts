import { Router } from 'express';
import { pedidoFactory } from '../factories/pedido.factory';

export default class PedidoRoutes {
  public router: Router;
  constructor() {
    this.router = Router();
    this.registerRouter();
  }

  private registerRouter(): void {
    this.router.get('/orders/:cnpj', pedidoFactory);
  }
}
