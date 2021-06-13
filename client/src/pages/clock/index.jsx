import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'
import ClockIn from '../../components/clock-in/'

import { selectCurrentUser } from '../../redux/user/selectors'
import { clockInStart } from '../../redux/clock/actions'

import { ClockPageContainer } from './styles'

const ClockPage = () => (
    <ClockPageContainer>
        <ClockIn/>
        <button onClick={clockInStart}>Clock In</button>
    </ClockPageContainer>
)

const mapStateToProps = createStructuredSelector({
    currentUser: selectCurrentUser
  })
  
  const mapDispatchToProps = dispatch => ({
    clockInStart: () => dispatch(clockInStart())
  })
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ClockPage)