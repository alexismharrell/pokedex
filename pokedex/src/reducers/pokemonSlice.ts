import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios, { AxiosResponse } from "axios"
import { axiosInstance } from "../api/api"
import { Ability, AbilityMeta, Move, MoveMeta } from "../details/Pokemon.model"

export type PokemonStoreState = {
  list: any[]
  status: string
  cache: string[]
  currentMoveList: Move[]
  currentAbilityList: Ability[]
}

const initialState: PokemonStoreState = {
  list: [],
  status: "idle",
  cache: [],
  currentMoveList: [],
  currentAbilityList: [],
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
    console.info(moveMetaData)
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

const pokemonSlice = createSlice({
  name: "pokemon",
  initialState,
  reducers: {
    updateCache(state, action) {
      const id = action.payload
      const index = state.cache.indexOf(id)
      //does it already exist, if so remove
      if (index > -1) {
        state.cache.splice(index, 1)
      }
      //add it to the front, if length after adding is over 10, remove oldest search
      if (state.cache.unshift(id) > 10) {
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
      .addCase(fetchAll.pending, (state, action) => {
        state.status = "pending"
      })
      .addCase(fetchAll.rejected, (state, actiion) => {
        state.status = "rejected"
      })
      .addCase(fetchAbilities.fulfilled, (state, action) => {
        state.currentAbilityList = action.payload
      })
      .addCase(fetchMoves.fulfilled, (state, action) => {
        state.currentMoveList = action.payload
      })
  },
})

export const { updateCache } = pokemonSlice.actions

export default pokemonSlice.reducer
