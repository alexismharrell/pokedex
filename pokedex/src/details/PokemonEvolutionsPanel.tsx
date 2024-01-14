import { List, ListItem, Paper, Typography } from "@mui/material"
import { useState } from "react"
import store from "../store/pokemonStore"
import styled from "@emotion/styled"

const StyledPaper = styled(Paper)`
  padding: 16px;
`

const PokemonEvolutionsPanel: React.FC<any> = () => {
  const [evos, setEvos] = useState(store.getState().pokemon.evolutionChain)
  store.subscribe(() => {
    setEvos(store.getState().pokemon.evolutionChain)
  })
  return (
    <StyledPaper>
      <Typography variant='h5'>Evolution Chains</Typography>
      <List>
        {evos.map((ev: string) => (
          <ListItem>
            <Typography variant='body1'>{ev}</Typography>
          </ListItem>
        ))}
      </List>
    </StyledPaper>
  )
}

export default PokemonEvolutionsPanel
