import { Grid, Paper, Typography } from "@mui/material"
import React from "react"
import { capitalizePokemonName } from "../common"
import styled from "@emotion/styled"
import { Pokemon } from "./Pokemon.model"
import PokemonAbilitiesTable from "./PokemonAbilitiesTable"
import PokemonMovesTable from "./PokemonMovesTable"

const DataText = styled(Typography)`
  padding: 8px;
`

const DataGrid = styled(Grid)`
  padding: 16px;
`

const PokemonDetailsPanel: React.FC<any> = (props: { pokemon: Pokemon }) => {
  const renderDataText = (data: string) => {
    return (
      <Paper>
        <DataText variant='h5'>{data}</DataText>
      </Paper>
    )
  }

  const parseHeightToMeters = (data: string): string => {
    // Height is returned by PokeAPI in decimeters, so divide by 10 to convert to meters
    const height = parseInt(data) / 10
    return height.toString() + " Meters"
  }

  const parseWeightToKg = (data: string): string => {
    // Weight is returned by PokeAPI in hectograms, so divide by 10 to convert to KG
    const weight = parseInt(data) / 10
    return weight.toString() + " kg"
  }

  const getBasicInfo = () => {
    return (
      <Grid container item spacing={1}>
        <Grid item xs={1}>
          {renderDataText(props.pokemon.id)}
        </Grid>
        <Grid item xs={5}>
          {renderDataText(capitalizePokemonName(props.pokemon.name))}
        </Grid>
        <Grid item xs={3}>
          {renderDataText(
            "Height: " + parseHeightToMeters(props.pokemon.height)
          )}
        </Grid>
        <Grid item xs={3}>
          {renderDataText("Weight: " + parseWeightToKg(props.pokemon.weight))}
        </Grid>
      </Grid>
    )
  }

  return (
    <Grid container item spacing={2}>
      <Grid item xs={3}>
        <Paper elevation={6}>Pictur</Paper>
      </Grid>
      <DataGrid container item xs={9} spacing={2}>
        {getBasicInfo()}
        <Grid item xs={12}>
          <PokemonAbilitiesTable />
        </Grid>
        <Grid item xs={12}>
          <PokemonMovesTable />
        </Grid>
      </DataGrid>
    </Grid>
  )
}

export default PokemonDetailsPanel
