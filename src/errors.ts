import { CustomError } from '@blackglory/errors'

export class BadEventError extends CustomError {
  constructor(state: string, event: string) {
    super(`State ${state} cannot react to event ${event}`)
  }
}
