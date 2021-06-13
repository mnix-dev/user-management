import React from 'react'
import { connect } from 'react-redux'
import { createStructuredSelector } from 'reselect'

import { selectCurrentUser } from '../../redux/user/selectors'
import { signOutStart } from '../../redux/user/actions'

import {
  HeaderContainer,
  LogoContainer,
  OptionsContainer,
  OptionLink
} from './styles'

export const Header = ({ currentUser, signOutStart }) => (
 <HeaderContainer>
   <LogoContainer to='/'>
      Logo
    </LogoContainer>
   {currentUser ? (
     <OptionsContainer>
       <OptionLink to='/'>HOME</OptionLink>
       <OptionLink to='/notes'>NOTES</OptionLink>
       <OptionLink to='/clock'>PUNCH CLOCK</OptionLink>
       <OptionLink as='div' onClick={signOutStart}>
         SIGN OUT
       </OptionLink>
     </OptionsContainer>
   ) : (
    <OptionsContainer>
      <OptionLink to='/'>HOME</OptionLink>
      <OptionLink to='/login'>SIGN IN</OptionLink>
    </OptionsContainer>
   )}
 </HeaderContainer>
)

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  signOutStart: () => dispatch(signOutStart())
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header)
