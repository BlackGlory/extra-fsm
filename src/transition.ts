import { IFiniteStateMachineSchema } from './types.js'
import { canTransition } from './can-transition.js'
import { BadEventError } from './errors.js'

export function transition<
  State extends string | number | symbol
, Event extends string | number | symbol
, TransitionEvent extends Event
>(
  schema: IFiniteStateMachineSchema<State, Event>
, state: State
, event: TransitionEvent
): State {
  if (canTransition(schema, state, event)) {
    return schema[state][event]!
  } else {
    throw new BadEventError(state, event)
  }
}
