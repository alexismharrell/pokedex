import { Grid } from "@mui/material"
import React from "react"
import { capitalizePokemonName } from "../common"

const PokemonDetailsPanel: React.FC<any> = (props: {pokemon: any}) => {
  console.info(props.pokemon)
  return (
    <Grid container item spacing={2}>
      <Grid item xs={3}>
        Picture
      </Grid>
      <Grid item xs={9}>
        <Grid container item spacing={1}>
          <Grid item xs={1}>{props.pokemon.id}</Grid>
          <Grid item xs={11}>{capitalizePokemonName(props.pokemon.name)}</Grid>
          <Grid item xs={12}>{props.pokemon.flavor_text}</Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default PokemonDetailsPanel