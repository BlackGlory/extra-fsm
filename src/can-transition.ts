import { IFiniteStateMachineSchema } from './types.js'

export function canTransition<
  State extends string | number | symbol
, Event extends string | number | symbol
, TransitionEvent extends Event
>(
  schema: IFiniteStateMachineSchema<State, Event>
, state: State
, event: TransitionEvent
): boolean {
  return event in schema[state]
}
