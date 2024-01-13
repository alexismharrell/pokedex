import { createBrowserRouter } from "react-router-dom";
import PokemonDetails from "./details/PokemonDetails";
import { AxiosResponse } from "axios";
import { axiosInstance } from "./api/api";
import { updateCache } from "./reducers/pokemonSlice";
import store from "./store/pokemonStore";
import { FrontPage } from "./FrontPage";

export const router = createBrowserRouter([
  {
    path: '/',
    element: <FrontPage />
  },
  {
    path: '/pokemon/:id',
    element: <PokemonDetails />,
    loader: async ({ params }) => {
      const response: AxiosResponse = await axiosInstance.get("pokemon-species/" + params['id'])
      store.dispatch(updateCache(params['id']))
      return response.data
    }
  }
])