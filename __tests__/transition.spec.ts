import { transition } from '@src/transition.js'
import { getError } from 'return-style'
import { BadEventError } from '@src/errors.js'

describe('transition', () => {
  describe('legal', () => {
    it('return new state', () => {
      const schema = {
        on: { turnOff: 'off' }
      , off: { turnOn: 'on' }
      }

      const result = transition(schema, 'on', 'turnOff')

      expect(result).toBe('off')
    })
  })

  describe('illegal', () => {
    it('throws BadEventError', () => {
      const schema = {
        on: { turnOff: 'off' }
      , off: { turnOn: 'on' }
      }

      const err = getError(() => transition(schema, 'on', 'turnOn'))
      
      expect(err).toBeInstanceOf(BadEventError)
    })
  })
})
