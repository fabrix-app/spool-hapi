import { FabrixController as Controller } from '@fabrix/fabrix/dist/common'

export class ViewController extends Controller {

  helloWorld (request, reply) {
    reply('Hello fabrix!')
  }
}
