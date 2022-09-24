export type IFiniteStateMachineSchema<State extends string, Event extends string> =
  Record<State, Partial<Record<Event, State>>>
