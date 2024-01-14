import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosResponse } from "axios"
import { axiosInstance } from "../api/api"
import {
  Ability,
  AbilityMeta,
  Move,
  MoveMeta,
  RecentView,
} from "../details/Pokemon.model"

export type PokemonStoreState = {
  list: any[]
  status: string
  cache: RecentView[]
  currentMoveList: Move[]
  currentAbilityList: Ability[]
  evolutionChain: string[]
}

const initialState: PokemonStoreState = {
  list: [],
  status: "idle",
  cache: [],
  currentMoveList: [],
  currentAbilityList: [],
  evolutionChain: [],
}

export const fetchAll = createAsyncThunk("pokemon/fetchAll", async () => {
  const response: AxiosResponse = await axiosInstance.get(
    "pokemon-species?limit=1025"
  )
  return response.data.results
})

export const fetchAbilities = createAsyncThunk(
  "pokemon/fetchAbilities",
  async (abilityMetaData: AbilityMeta[]) => {
    let retArr: any[] = []
    let promiseList: any = []
    abilityMetaData.map((metaData: AbilityMeta) => {
      promiseList.push(axios.get(metaData.url))
    })
    await Promise.all(promiseList).then((val) => {
      val.map((response) => {
        let effectObj = response.data["effect_entries"].find((effect: any) => {
          return effect.language.name === "en"
        })
        retArr = [
          ...retArr,
          { name: response.data.name, effect: effectObj.effect },
        ]
      })
    })
    return retArr
  }
)

export const fetchMoves = createAsyncThunk(
  "pokemon/fetchMoves",
  async (moveMetaData: MoveMeta[]) => {
    let retArr: any[] = []
    let promiseList: any[] = []
    moveMetaData.map((metaData: MoveMeta) => {
      promiseList.push(axios.get(metaData.url))
    })
    await Promise.all(promiseList).then((val) => {
      val.map((response) => {
        let flavorTextObj = response.data["flavor_text_entries"].findLast(
          (flavorTxt: any) => {
            return flavorTxt.language.name === "en"
          }
        )
        retArr = [
          ...retArr,
          {
            name: response.data.name,
            flavorText: flavorTextObj["flavor_text"],
            damageClass: response.data["damage_class"].name,
            pp: response.data.pp,
            type: response.data.type.name,
          },
        ]
      })
    })
    return retArr
  }
)

const parseEvolutionChain = (evo: any): string[] => {
  const current = evo.species.name
  let out: any[] = []

  if (evo["evolves_to"] && evo["evolves_to"].length > 0) {
    evo["evolves_to"].map((ev: any) => {
      let next = parseEvolutionChain(ev)[0]
      out = [...out, `${current} -> ${next}`]
    })
  } else {
    out = [...out, `${current}`]
  }

  return out
}

export const fetchEvolutionChain = createAsyncThunk(
  "pokemon/fetchEvolutionChain",
  async (id: string) => {
    const speciesResponse = await axiosInstance.get("pokemon-species/" + id)
    const evolutionChainResponse = await axios.get(
      speciesResponse.data["evolution_chain"].url
    )
    return parseEvolutionChain(evolutionChainResponse.data.chain)
  }
)

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    updateCache(state, action) {
      const id = action.payload.id
      const name = action.payload.name
      const index = state.cache.findIndex((val: RecentView) => {
        return val.id === id
      })
      //does it already exist, if so remove
      if (index > -1) {
        state.cache.splice(index, 1)
      }
      //add it to the front, if length after adding is over 10, remove oldest search
      if (state.cache.unshift({id: id, name: name}) > 10) {
        state.cache.pop()
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAll.fulfilled, (state, action) => {
        state.list = action.payload
        state.status = "idle"
      })
      .addCase(fetchAll.pending, (state) => {
        state.status = "pending"
      })
      .addCase(fetchAll.rejected, (state) => {
        state.status = "rejected"
      })
      .addCase(fetchAbilities.fulfilled, (state, action) => {
        state.currentAbilityList = action.payload
      })
      .addCase(fetchMoves.fulfilled, (state, action) => {
        state.currentMoveList = action.payload
      })
      .addCase(fetchEvolutionChain.fulfilled, (state, action) => {
        state.evolutionChain = action.payload
      })
  },
})

export const { updateCache } = pokemonSlice.actions

export default pokemonSlice.reducer
