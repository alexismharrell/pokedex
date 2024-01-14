import { ImageList, ImageListItem, Paper } from "@mui/material"

const PokemonSpritePanel: React.FC<any> = (props: {urls: string[]}) => {
  return (
    <Paper>
      <ImageList cols={2}>
        <ImageListItem key='front'>
          <img src={props.urls[0]} />
        </ImageListItem>
        <ImageListItem key='back'>
          <img src={props.urls[1]} />
        </ImageListItem>
      </ImageList>
    </Paper>
  )
}

export default PokemonSpritePanel