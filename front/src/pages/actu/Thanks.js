import Typography from '@material-ui/core/Typography'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Fragment } from 'react'
import styled from 'styled-components'

import moneyBank from '../../images/money-bank.svg'

const StyledThanks = styled.div`
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  max-width: 48rem;
`

const StyledImg = styled.img`
  max-width: 30rem;
  width: 100%;
`

const Title = styled(Typography)`
  padding: 4rem 0;
`

export const Thanks = ({ activeMonth, location: { search } }) => {
  const isDeclarationFinished = !search.includes('later')

  return (
    <StyledThanks>
      <StyledImg src={moneyBank} alt="" />
      {isDeclarationFinished ? (
        <Fragment>
          <Title variant="title">
            Merci, votre actualisation et l'envoi de vos documents sont terminés
            {activeMonth
              ? ` pour le mois de ${moment(activeMonth).format('MMMM')} ! ` // eslint-disable-line no-irregular-whitespace
              : ' '}
            <span role="img" aria-label="Pouce levé">
              👍
            </span>
          </Title>
          <Typography paragraph>
            Pôle Emploi va recevoir et traiter les documents que vous nous avez
            fait parvenir. Si vous rencontrez un problème ou si vous vous posez
            des questions, vous pouvez joindre votre conseiller depuis votre
            espace personnel.
          </Typography>
          <br />
          <Typography paragraph>
            Si vous souhaitez envoyer d'autres documents à Pôle Emploi, merci de
            le faire depuis votre espace personnel.
          </Typography>
        </Fragment>
      ) : (
        <Fragment>
          <Title variant="title">
            Merci, vos données ont bien été enregistrées.
          </Title>
          <Typography paragraph>
            Vous pourrez reprendre ultérieurement.
          </Typography>
        </Fragment>
      )}
    </StyledThanks>
  )
}

Thanks.propTypes = {
  activeMonth: PropTypes.instanceOf(Date),
  location: PropTypes.shape({ search: PropTypes.string.isRequired }).isRequired,
}

export default Thanks
