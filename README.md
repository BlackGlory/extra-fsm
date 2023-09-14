# extra-fsm
## Install
```sh
npm install --save extra-fsm
# or
yarn add extra-fsm
```

## Usage
The finite state machine provided in the library is the most common table-driven state machine,
where the transition rules are defined in a table,
which is easy to understand.

Example, a machine that can be started and stopped:
```ts
import { FiniteStateMachine, transition } from 'extra-fsm'

const schema = {
  stopped: { start: 'running' }
, running: { stop: 'stopped' }
}

// OOP
const machine = new FiniteStateMachine(schema, 'stopped')
machine.send('start')
console.log(machine.state) // running

// FP
const newState = transition(schema, 'stopped', 'start')
console.log(newState) // running
```

The library intentionally does not add any kind of advanced transition rules,
such as defining state transition events as functions.
Advanced features are not supported because my experience has shown that
they are not as good as customized specialized wrappers,
especially when considering extensibility.

Example, a machine that is not reliable,
has a 50% chance of failing to start,
but your luck attribute affects the success rate:
```ts
import { FiniteStateMachine, transition } from 'extra-fsm'

interface IGameState {
  attributes: IAttributes
}

interface IAttributes {
  luck: number
}

class UnreliableMachine {
  static schema = {
    stopped: { start: 'running' }
  , running: { stop: 'stopped' }
  }

  private fsm = new FiniteStateMachine(UnreliableMachine.schema, 'stopped')

  get state() {
    return this.fsm.state
  }

  constructor(private game: IGameState) {}

  start(): void {
    assert(this.fsm.can('start'))

    if (Math.random() < 0.5 * (this.game.attributes.luck + 1)) {
      this.fsm.send('start')
    }
  }

  stop(): void {
    this.fsm.send('stop')
  }
}

const game: IGameState = {
  attributes: {
    luck: 1
  }
}

const machine = new UnreliableMachine(game)
machine.start()
console.log(machine.state) // running
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
