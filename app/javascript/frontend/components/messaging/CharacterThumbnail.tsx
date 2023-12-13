import React from "react"
import { ICharacter } from "./types"

interface CharacterThumbnailProps {
  character: ICharacter
}

export default function CharacterThumbnail({
  character,
}: CharacterThumbnailProps) {
  return (
    <img
      src={character.thumbnail}
      className="character thumbnail"
      alt={character.name}
    />
  )
}
