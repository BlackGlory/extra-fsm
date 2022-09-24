import { IFiniteStateMachineSchema } from './types'

export function canTransition<
  State extends string
, Event extends string
, TransitionEvent extends Event
>(
  schema: IFiniteStateMachineSchema<State, Event>
, state: State
, event: TransitionEvent
): boolean {
  return event in schema[state]
}
