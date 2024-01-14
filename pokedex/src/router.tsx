import { createBrowserRouter } from "react-router-dom"
import PokemonDetails from "./details/PokemonDetails"
import { AxiosResponse } from "axios"
import { axiosInstance } from "./api/api"
import { fetchAbilities, fetchEvolutionChain, fetchMoves, updateCache } from "./reducers/pokemonSlice"
import store from "./store/pokemonStore"
import { FrontPage } from "./FrontPage"
import { Pokemon } from "./details/Pokemon.model"

function buildPokemonObject(response: AxiosResponse): Pokemon {
  const data = response.data
  let retPoke: Pokemon = {
    id: data.id,
    name: data.name,
    height: data.height,
    weight: data.weight,
    abilities: [],
    moves: [],
    types: [],
    speciesUrl: data.species.url,
    sprites: [data.sprites['front_default'], data.sprites['back_default']]
  }

  data.abilities.map((val: any) => {
    retPoke.abilities.push(val.ability)
  })

  data.moves.map((val: any) => {
    retPoke.moves.push(val.move)
  })

  data.types.map((val: any) => {
    retPoke.types.push(val.type)
  })
  return retPoke
}

export const router = createBrowserRouter([
  {
    path: "/",
    element: <FrontPage />,
  },
  {
    path: "/pokemon/:id",
    element: <PokemonDetails />,
    loader: async ({ params }) => {
      let pokemon: Pokemon = buildPokemonObject(
        await axiosInstance.get("pokemon/" + params["id"])
      )
      store.dispatch(updateCache({id: params["id"], name: pokemon.name}))
      await store.dispatch(fetchAbilities(pokemon.abilities))
      await store.dispatch(fetchMoves(pokemon.moves))
      await store.dispatch(fetchEvolutionChain(pokemon.id))
      return { pokemon: pokemon }
    },
  },
])
