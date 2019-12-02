import React from 'react'
import { Link } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import styled from 'styled-components'
import withWidth from '@material-ui/core/withWidth'
import { useMediaQuery } from '@material-ui/core'

import { primaryBlue, mobileBreakpoint } from '../../constants'
import home from '../../images/home.svg'

const HomeIcon = styled.img`
  width: 2.5rem;
  margin-right: 1rem;
  vertical-align: middle;
`

const StyledTitle = styled(Typography).attrs({
  variant: 'h2',
  component: 'div',
})`
  && {
    font-family: filson-soft;
    color: #000;
    font-weight: bold;
    padding-right: 1.5rem;
  }
`

const HomeLink = styled(Link)`
  && {
    color: #000;
    text-decoration: none;
    font-family: filson-soft;
  }
`

export const AppTitle = ({ ...props }) => {
  const showHomeIcon = useMediaQuery(`(max-width:${mobileBreakpoint})`)

  return (
    <StyledTitle {...props}>
      <HomeLink to="/dashboard" title="Retourner à l'accueil du site">
        {showHomeIcon && <HomeIcon src={home} alt="" />}
        zen<span style={{ color: primaryBlue }}>.</span>
      </HomeLink>
    </StyledTitle>
  )
}

export default withWidth()(AppTitle)
