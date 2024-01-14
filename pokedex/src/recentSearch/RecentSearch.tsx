import { List, ListItem, ListItemText, Paper, Typography } from "@mui/material"
import store from "../store/pokemonStore"
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import { capitalizePokemonName } from "../common"
import styled from "@emotion/styled"

const StyledListItem = styled(ListItem)`
  cursor: pointer;
  &:hover {
    background-color: #DADADA;
  }
`

const RecentSearch: React.FC<any> = () => {
  const navigate = useNavigate()
  const [recentSearches, setRecentSearches] = useState(
    store.getState().pokemon.cache
  )
  store.subscribe(() => {
    setRecentSearches(store.getState().pokemon.cache)
  })

  const handleClick = (id: string) => {
    navigate("../pokemon/" + id)
  }

  return (
    <Paper>
      <Typography variant='h4'>Recent Searches</Typography>
      <List>
        {recentSearches.length > 0 &&
          recentSearches.map((val) => {
            return (
              <StyledListItem>
                <ListItemText onClick={() => handleClick(val.id)}>
                  {capitalizePokemonName(val.name)}
                </ListItemText>
              </StyledListItem>
            )
          })}
      </List>
    </Paper>
  )
}

export default RecentSearch
