import styled from "@emotion/styled";
import React from "react";
import SearchField from "./search/SearchComponent";
import { Stack, Typography } from "@mui/material";

const FrontPageContainer = styled(Stack)`
  padding: 10% 15%;
`

export const FrontPage: React.FC<any> = () => {
  return (
    <FrontPageContainer spacing={5} alignItems={"center"}>
      <Typography variant="h2">Pokedex Search Engine</Typography>
      <SearchField></SearchField>
    </FrontPageContainer>
  )
}