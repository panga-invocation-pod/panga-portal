import React from "react"
import { ICharacter } from "./types"
import yamDaisy from "../../images/characters/yam_daisy/thumbnail.png"

interface CharacterThumbnailProps {
  character: ICharacter
}

export default function CharacterThumbnail({
  character,
}: CharacterThumbnailProps) {
  return (
    <img src={yamDaisy} className="character thumbnail" alt={character.name} />
  )
}
