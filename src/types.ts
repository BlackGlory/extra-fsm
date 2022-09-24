export type IFiniteStateMachineSchema<
  State extends string | number | symbol
, Event extends string | number | symbol
> = Record<State, Partial<Record<Event, State>>>
