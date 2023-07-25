import mongoose, { Document, Model } from 'mongoose';

const PedidoSchema = new mongoose.Schema(
  {
    numero: {
      type: String,
      required: true,
    },
    itens: [
      {
        nome: { type: String, max: 55 },
        qtd: { type: Number, max: 100 },
      },
    ],
    cnpj: {
      type: String,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
    toObject: { virtuals: true, getters: true },
  }
);

export const Pedido = mongoose.model('Pedido', PedidoSchema);
