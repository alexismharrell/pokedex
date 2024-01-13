import { Container, List, ListItem, ListItemText } from "@mui/material"
import store from "../store/pokemonStore"
import React, { useState } from "react"

const RecentSearch: React.FC<any> = () => {
  const [recentSearches, setRecentSearches] = useState(
    store.getState().pokemon.cache
  )
  store.subscribe(() => {
    setRecentSearches(store.getState().pokemon.cache)
  })

  return (
    <Container>
      <List>
        {recentSearches.length > 1 &&
          recentSearches.map((val) => {
            return (
              <ListItem>
                <ListItemText>adsdawd</ListItemText>
              </ListItem>
            )
          })}
      </List>
    </Container>
  )
}

export default RecentSearch
