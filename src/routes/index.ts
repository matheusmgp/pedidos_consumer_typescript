import { Router } from 'express';
import PedidoRoutes from './pedido.routes';

const routes = Router();

routes.use(new PedidoRoutes().router);

export { routes };
