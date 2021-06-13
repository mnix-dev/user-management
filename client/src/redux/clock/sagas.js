import { takeLatest, put, all, call } from 'redux-saga/effects'

import ClockActionTypes from './types'

import { clockInSuccess, clockInFail } from './actions'

import axios from 'axios'

export function* clockIn({ payload: { clock } }) {
  try {
    // const { clock } = async () => await axios.post('clock/react/in')
    console.log('test')
    yield put(clockInSuccess())
    }
     catch (error) {
    yield put(clockInFail(error))
  }
}

export function* afterClockIn({ payload: { clock } }) {
  yield console.log(clock)
}

export function* onClockInStart() {
  yield takeLatest(ClockActionTypes.CLOCK_IN_START, clockIn)
}

export function* clockSagas() {
  yield all([
    call(onClockInStart)
  ])
}