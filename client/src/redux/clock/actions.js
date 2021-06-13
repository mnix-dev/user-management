import ClockActionTypes from './types'

export const clockInStart = () => ({
  type: ClockActionTypes.CLOCK_IN_START
})

export const clockInSuccess = () => ({
  type: ClockActionTypes.CLOCK_IN_SUCCESS
})

export const clockInFail = () => ({
  type: ClockActionTypes.CLOCK_IN_FAIL
})