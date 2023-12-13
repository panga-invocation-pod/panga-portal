import React from "react"
import { ICharacter } from "../messaging/types"
import yamDaisy from "./images/yam_daisy/thumbnail.png"
import { Avatar } from "@chakra-ui/react"

interface CharacterThumbnailProps {
  character: ICharacter
}

export default function CharacterThumbnail({
  character,
}: CharacterThumbnailProps) {
  return (
    <Avatar
      src={yamDaisy as unknown as string}
      size="lg"
      className="character-avatar"
      name={character.name}
    />
  )
}
