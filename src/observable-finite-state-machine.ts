import { FiniteStateMachine } from './finite-state-machine.js'
import { Subject, Observable } from 'rxjs'
import { isEmptyObject } from 'extra-utils'

export interface IFiniteStateMachineStateChange<
  State extends string | number | symbol
, Event extends string | number | symbol
> {
  event: Event
  oldState: State
  newState: State
}

export class ObservableFiniteStateMachine<
  State extends string | number | symbol
, Event extends string | number | symbol
> extends FiniteStateMachine<State, Event> {
  private stateChanges = new Subject<IFiniteStateMachineStateChange<State, Event>>()

  get [Symbol.toStringTag](): string {
    return this.constructor.name
  }

  observeStateChanges(): Observable<IFiniteStateMachineStateChange<State, Event>> {
    return this.stateChanges
  }

  /**
   * @throws {BadEventError}
   */
  send(event: Event): void {
    const oldState = this.state
    super.send(event)
    const newState = this.state

    this.stateChanges.next({ event, oldState, newState })
    if (isEmptyObject(this.schema[newState])) {
      this.stateChanges.complete()
    }
  }
}
