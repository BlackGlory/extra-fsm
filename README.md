# extra-fsm
The library supports both OOP and FP.

## Install
```sh
npm install --save extra-fsm
# or
yarn add extra-fsm
```

### Usage
```ts
import { FiniteStateMachine, transition } from 'extra-fsm'

const schema = {
  stopped: { start: 'running' }
, running: { stop: 'stopped' }
}

// OOP
const fsm = new FiniteStateMachine(schema, 'stopped')
fsm.send('start')
console.log(fsm.state) // running

// FP
const newState = transition(schema, 'stopped', 'start')
console.log(newState)// running
```

## API
```ts
type IFiniteStateMachineSchema<
  State extends string | number | symbol
, Event extends string | number | symbol
> = Record<State, Partial<Record<Event, State>>>
```

### FiniteStateMachine
```ts
class FiniteStateMachine<
  State extends string | number | symbol
, Event extends string | number | symbol
> {
  get [Symbol.toStringTag](): string
  get state(): State

  constructor(
    schema: IFiniteStateMachineSchema<State, Event>
  , initialState: State
  )

  matches(state: State): boolean
  can(event: Event): boolean

  /**
   * @throws {BadEventError}
   */
  send(event: Event): void
}
```

### ObservableFiniteStateMachine
```ts
interface IFiniteStateMachineStateChange<
  State extends string | number | symbol
, Event extends string | number | symbol
> {
  event: Event
  oldState: State
  newState: State
}

class ObservableFiniteStateMachine<
  State extends string | number | symbol
, Event extends string | number | symbol
> extends FiniteStateMachine<State, Event> {
  get [Symbol.toStringTag](): string

  observeStateChanges(): Observable<IFiniteStateMachineStateChange<State, Event>>
}
```

### transition
```ts
export function transition<
  State extends string | number | symbol
, Event extends string | number | symbol
, TransitionEvent extends Event
>(
  schema: IFiniteStateMachineSchema<State, Event>
, state: State
, event: TransitionEvent
): State
```

### canTransition
```ts
function canTransition<
  State extends string | number | symbol
, Event extends string | number | symbol
>(
  schema: IFiniteStateMachineSchema<State, Event>
, state: State
, event: Event
) => boolean
```
