import styled from "@emotion/styled";
import React from "react";
import SearchField from "./search/SearchComponent";
import { Stack, Typography } from "@mui/material";
import RecentSearch from "./recentSearch/RecentSearch";

const FrontPageContainer = styled(Stack)`
  padding: 10% 15%;
`

const TitleLabel = styled(Typography)`
  
`

export const FrontPage: React.FC<any> = () => {
  return (
    <FrontPageContainer spacing={5} alignItems={"center"}>
      <TitleLabel variant="h2">Pokedex Search Engine</TitleLabel>
      <SearchField></SearchField>
      <RecentSearch />
    </FrontPageContainer>
  )
}