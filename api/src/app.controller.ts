import { Controller, Get, Inject } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices'
import { Message } from './message.event';

@Controller()
export class AppController {
  constructor(
    @Inject('MATH_SERVICE') private client: ClientProxy
  ) {}

  async onApplicationBootstrap() {
    await this.client.connect()
  }

  @Get()
  async getHello() {
    const res = await this.client.emit<any>('message_print', new Message(
      'Hello World'
    ));
    return res
  }
}
