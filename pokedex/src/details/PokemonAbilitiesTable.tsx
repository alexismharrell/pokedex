import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material"
import { Ability } from "./Pokemon.model"
import { useState } from "react"
import store from "../store/pokemonStore"

const PokemonAbilitiesTable: React.FC<any> = () => {
  const [abilities, setAbilities] = useState(
    store.getState().pokemon.currentAbilityList
  )
  store.subscribe(() => {
    setAbilities(store.getState().pokemon.currentAbilityList)
  })
  
  return (
    <>
      <Typography variant='h4'>Abilities</Typography>
      <TableContainer component={Paper} sx={{ minHeight: 100 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Typography variant='body1'>Name</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body1'>Effect</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {abilities.map((val: Ability) => (
              <TableRow key={val.name}>
                <TableCell align='center'> {val.name}</TableCell>
                <TableCell align='center'> {val.effect}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PokemonAbilitiesTable
