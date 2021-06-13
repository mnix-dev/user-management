import React from 'react'
import { connect } from 'react-redux'

import { clockInStart } from '../../redux/clock/actions'

import CustomButton from '../../components/custom-button/'
import {
  Container,
  Clock
} from './styles'



const ClockIn = () => (
  <Container>
    <Clock disabled value='some time' /> 
    <CustomButton onClick={clockInStart} >Clock In</CustomButton>
  </Container>
)

  const mapDispatchToProps = dispatch => ({
    clockInStart: () => dispatch(clockInStart())
  })
  
  export default connect(
    null,
    mapDispatchToProps
  )(ClockIn)
  