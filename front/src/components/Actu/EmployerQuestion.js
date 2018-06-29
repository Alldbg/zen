import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import Radio from '@material-ui/core/Radio'
import RadioGroup from '@material-ui/core/RadioGroup'
import TextField from '@material-ui/core/TextField'
import Clear from '@material-ui/icons/Clear'
import moment from 'moment'
import PropTypes from 'prop-types'
import React, { Component } from 'react'
import styled from 'styled-components'

const StyledContainer = styled.div`
  display: flex;
  align-items: center;
`

const StyledMain = styled.div`
  display: flex;
  align-items: stretch;
  justify-content: space-between;
  border: 1px solid #9c9c9c;
  border-radius: 1rem;
  padding: 1rem;
  margin-bottom: 0.75rem;
  margin-top: 0.75rem;
  flex-wrap: wrap;
`

const FieldsContainer = styled.div`
  flex: 1 1 30rem;
  border-right: 1px solid #9c9c9c;
`

const StyledTextField = styled(TextField)`
  && {
    margin-right: 1.5rem;
    width: 20rem;
  }
`

const StyledFormControl = styled(FormControl)`
  && {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 0 1 auto;
    padding-left: 1.5rem;
  }
`

const StyledFormLabel = styled(FormLabel)`
  flex-shrink: 1;
  margin-right: 1.5rem;
`

const StyledClear = styled(Clear)`
  && {
    width: 3rem;
    height: 3rem;
    cursor: pointer;
  }
`

export class EmployerQuestion extends Component {
  static propTypes = {
    employerName: PropTypes.shape({
      value: PropTypes.string,
      error: PropTypes.string,
    }).isRequired,
    workHours: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      error: PropTypes.string,
    }).isRequired,
    salary: PropTypes.shape({
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
      error: PropTypes.string,
    }).isRequired,
    hasEndedThisMonth: PropTypes.shape({
      value: PropTypes.bool,
      error: PropTypes.string,
    }),
    index: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired, // eslint-disable-line
    onRemove: PropTypes.func.isRequired,
    activeMonth: PropTypes.instanceOf(Date).isRequired,
  }

  inputHandler = (string) => ({ target: { name: fieldName, value } }) => {
    // The input 'name' attribute needs an array format
    // to avoid confusions (for example, browser autocompletions)
    // but the parent component here juste needs 'employerName'
    // for example.
    const name = fieldName.substr(0, fieldName.indexOf('['))
    this.props[string]({
      name,
      value: name !== 'hasEndedThisMonth' ? value : value === 'yes',
      index: this.props.index,
    })
  }

  onChange = this.inputHandler('onChange')
  onBlur = this.inputHandler('onBlur')

  onRemove = () => this.props.onRemove(this.props.index)

  render() {
    const {
      employerName,
      index,
      workHours,
      salary,
      hasEndedThisMonth,
    } = this.props

    const hasEndedThisMonthValue =
      hasEndedThisMonth.value === null
        ? ''
        : hasEndedThisMonth.value
          ? 'yes'
          : 'no'

    return (
      <StyledContainer>
        <StyledMain>
          <FieldsContainer>
            <StyledTextField
              label="Nom de l'employeur"
              name={`employerName[${index}]`}
              value={employerName.value}
              onChange={this.onChange}
              onBlur={this.onBlur}
              error={!!employerName.error}
              helperText={employerName.error}
            />
            <StyledTextField
              label="Nombre d'heures"
              name={`workHours[${index}]`}
              value={workHours.value}
              onChange={this.onChange}
              onBlur={this.onBlur}
              error={!!workHours.error}
              helperText={workHours.error}
            />
            <StyledTextField
              label="Salaire brut €"
              name={`salary[${index}]`}
              value={salary.value}
              onChange={this.onChange}
              onBlur={this.onBlur}
              error={!!salary.error}
              helperText={salary.error}
            />
          </FieldsContainer>
          <StyledFormControl>
            <StyledFormLabel>
              Ce contrat se termine-t-il en{' '}
              {moment(this.props.activeMonth).format('MMMM')} ?
              {hasEndedThisMonth.error && (
                <FormHelperText error>{hasEndedThisMonth.error}</FormHelperText>
              )}
            </StyledFormLabel>
            <RadioGroup
              row
              aria-label="oui ou non"
              name={`hasEndedThisMonth[${index}]`}
              value={hasEndedThisMonthValue}
              onChange={this.onChange}
            >
              <FormControlLabel
                value="yes"
                control={<Radio color="primary" />}
                label="Oui"
              />
              <FormControlLabel
                value="no"
                control={<Radio color="primary" />}
                label="Non"
              />
            </RadioGroup>
          </StyledFormControl>
        </StyledMain>
        <StyledClear onClick={this.onRemove} role="button" />
      </StyledContainer>
    )
  }
}

export default EmployerQuestion
