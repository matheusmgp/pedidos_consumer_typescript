import { Response, Request } from 'express';
import PedidoService from '../services/pedido.service';

export default class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}
  public async handleRequest(req: Request, res: Response): Promise<any> {
    let data: any;
    try {
      data = await this.pedidoService.findAllByCnpj(req.params.cnpj);
    } catch (error: any) {
      res.status(400).json({ message: 'Problema na requisição.' + error });
    }

    res.status(200).json(data);
  }
}
