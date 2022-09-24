import { canTransition } from '@src/can-transition'

describe('canTransition', () => {
  describe('legal', () => {
    it('returns true', () => {
      const schema = {
        on: { turnOff: 'off' }
      , off: { turnOn: 'on' }
      }

      const result = canTransition(schema, 'on', 'turnOff')

      expect(result).toBe(true)
    })
  })

  describe('illegal', () => {
    it('returns true', () => {
      const schema = {
        on: { turnOff: 'off' }
      , off: { turnOn: 'on' }
      }

      const result = canTransition(schema, 'on', 'turnOn')
      
      expect(result).toBe(false)
    })
  })
})
