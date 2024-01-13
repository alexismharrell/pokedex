import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import {  AxiosResponse } from "axios"
import { axiosInstance } from "../api/api"

export type PokemonStoreState = {
  list: any[]
  status: string
  cache: string[]
}

const initialState: PokemonStoreState = { list: [], status: "idle", cache: [] }

export const fetchAll = createAsyncThunk("pokemon/fetchAll", async () => {
  const response: AxiosResponse = await axiosInstance.get("pokemon-species?limit=1025")
  return response.data.results
})

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
    }
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
  },
})

export const {
  updateCache
} = pokemonSlice.actions

export default pokemonSlice.reducer
