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
import store from "../store/pokemonStore"
import { useState } from "react"
import { Move } from "./Pokemon.model"

const PokemonMovesTable: React.FC<any> = () => {
  const [moves, setMoves] = useState(store.getState().pokemon.currentMoveList)
  store.subscribe(() => {
    setMoves(store.getState().pokemon.currentMoveList)
  })
  return (
    <>
      <Typography variant='h4'>Moves</Typography>
      <TableContainer component={Paper} sx={{ maxHeight: 600 }}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell align='center'>
                <Typography variant='body1'>Name</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body1'>Flavor Text</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body1'>Damage Class</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body1'>PP</Typography>
              </TableCell>
              <TableCell align='center'>
                <Typography variant='body1'>Type</Typography>
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {moves.map((val: Move) => (
              <TableRow key={val.name}>
                <TableCell align='center'>{val.name}</TableCell>
                <TableCell align='center'>{val.flavorText}</TableCell>
                <TableCell align='center'>{val.damageClass}</TableCell>
                <TableCell align='center'>{val.pp}</TableCell>
                <TableCell align='center'>{val.type}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}

export default PokemonMovesTable
