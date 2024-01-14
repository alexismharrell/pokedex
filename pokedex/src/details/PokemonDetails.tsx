import styled from "@emotion/styled"
import { Box, Grid, Paper, Typography } from "@mui/material"
import React from "react"
import { useLoaderData } from "react-router-dom"
import SearchField from "../search/SearchComponent"
import RecentSearch from "../recentSearch/RecentSearch"
import PokemonDetailsPanel from "./PokemonDetailsPanel"

const Header = styled.div`
  display: flex;
  width: 100%;
  padding: 16px 0;
  justify-content: center;
`

const PokemonDetails: React.FC<any> = () => {
  const loaderData: any = useLoaderData()
  console.info(loaderData)
  const pokemon = loaderData.pokemon

  return (
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Header>
            <div>Website name and link to home here</div>
            <SearchField />
          </Header>
        </Grid>
        <Grid item xs={1}>
          <RecentSearch />
        </Grid>
        <Grid item xs={9}>
          <PokemonDetailsPanel pokemon={pokemon} />
        </Grid>
        <Grid item xs={2}>
          <Paper elevation={6}>
            <Typography variant='h5'>Evolution list</Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  )
}

export default PokemonDetails
