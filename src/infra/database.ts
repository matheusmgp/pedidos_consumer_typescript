import { connect as mongooseConnect, connection } from 'mongoose';

const MONGODB: string = process.env.MONGODB || '';

export const connect = async (): Promise<void> => {
  await mongooseConnect('mongodb://127.0.0.1:27017/pedidos');
  console.log('Connected to MONGODB database');
};

export const close = (): Promise<void> => connection.close();
