import styled from "@emotion/styled"
import { Box, Grid } from "@mui/material"
import React from "react"
import { useLoaderData } from "react-router-dom"
import SearchField from "../search/SearchComponent"
import RecentSearch from "../recentSearch/RecentSearch"
import PokemonDetailsPanel from "./PokemonDetailsPanel"
import PokemonEvolutionsPanel from "./PokemonEvolutionsPanel"

const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 0;
  justify-content: center;
`

const PokemonDetails: React.FC<any> = () => {
  const loaderData: any = useLoaderData()
  const pokemon = loaderData.pokemon

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Header>
            <SearchField />
          </Header>
        </Grid>
        <Grid item xs={2}>
          <RecentSearch />
        </Grid>
        <Grid item xs={8}>
          <PokemonDetailsPanel pokemon={pokemon} />
        </Grid>
        <Grid item xs={2}>
          <PokemonEvolutionsPanel />
        </Grid>
      </Grid>
    </Box>
  )
}

export default PokemonDetails
