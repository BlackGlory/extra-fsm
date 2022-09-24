import { CustomError } from '@blackglory/errors'

export class BadEventError extends CustomError {
  constructor(
    state: string | number | symbol
  , event: string | number | symbol
  ) {
    super(`State ${state.toString()} cannot react to event ${event.toString()}`)
  }
}
