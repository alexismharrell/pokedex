import styled from '@emotion/styled'
import { Autocomplete, TextField } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { capitalizePokemonName } from '../common'

const SearchFieldInput = styled(Autocomplete)`
  width: 75%;
`

const selectAllPokemon = (state: any) => {
  return state.pokemon.list
}

const SearchField: React.FC<any> = () => {
  const navigate = useNavigate()
  const pokemon: any[] = useSelector(selectAllPokemon)

  const handleSelect = (selection: any) => {
    const url = selection.url || ''
    // TODO: Figure out how to pass the URL and keep track of the pokemon id in the browser URL
    // extract the id from the url
    navigate('../pokemon/' + url.substring(42, url.length-1))
  }
  
  return (
    <SearchFieldInput 
      options={pokemon}
      getOptionLabel={(option: any) => capitalizePokemonName(option.name)}
      renderInput={(params) => <TextField {...params} label="Search for a pokemon" />}
      onChange={(event, val) => {
        event.preventDefault()
        handleSelect(val)
      }} 
    />
  )
}

export default SearchField
