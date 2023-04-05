import { IFiniteStateMachineSchema } from './types.js'
import { BadEventError } from './errors.js'

export class FiniteStateMachine<
  State extends string | number | symbol
, Event extends string | number | symbol
> {
  private _state: State

  get [Symbol.toStringTag](): string {
    return this.constructor.name
  }

  get state(): State {
    return this._state
  }

  constructor(
    protected schema: IFiniteStateMachineSchema<State, Event>
  , initialState: State
  ) {
    this._state = initialState
  }

  matches(state: State): boolean {
    return this._state === state
  }

  can(event: Event): boolean {
    return event in this.schema[this.state]
  }

  /**
   * @throws {BadEventError}
   */
  send(event: Event): void {
    if (this.can(event)) {
      this._state = this.schema[this.state][event]!
    } else {
      throw new BadEventError(this.state, event)
    }
  }
}
