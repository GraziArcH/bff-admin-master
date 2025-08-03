import ArchFramework from 'versatus-arch-framework/src';

import { config } from './config';
import { SendEmailEventMessageDto } from '../domain/user-domain/dtos';

const queueName = config.QUEUE_NAME;

/**
 * Classe responsável por produzir e enviar mensagens de email para a fila.
 */
export class EmailMessageProducer {
  /**
   * Envia uma mensagem de evento de email para a fila.
   * @param message - Objeto contendo os dados da mensagem de evento de email.
   * @returns Retorna uma promessa que resolve para um valor booleano indicando se o envio foi bem-sucedido.
   * @throws Lança um erro se o envio para a fila falhar.
   */
  async send(message: SendEmailEventMessageDto): Promise<boolean> {
    const framework = ArchFramework.getQueueInstance();

    return framework.sendToQueue(queueName, JSON.stringify(message));
  }
}
