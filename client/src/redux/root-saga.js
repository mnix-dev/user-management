import { all, call } from 'redux-saga/effects'

import { userSagas } from './user/sagas'
import { clockSagas } from './clock/sagas'

export default function* rootSaga() {
  yield all( [call(userSagas), call(clockSagas)])
}
