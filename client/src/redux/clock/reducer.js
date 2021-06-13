import ClockActionTypes from './types'

const INITIAL_STATE = {
  currentClock: null,
  error: null
}

const clockReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case ClockActionTypes.CLOCK_IN_SUCCESS:
      return {
        ...state,
        currentClock: action.payload,
        error: null
      }
    case ClockActionTypes.CLOCK_OUT_SUCCESS:
      return {
        ...state,
        currentClock: null,
        error: null
      }
    case ClockActionTypes.CLOCK_IN_FAIL:
      return {
        ...state,
        error: action.payload
      }
    default:
      return state
  }
}

export default clockReducer
