import React from "react"
import { ICharacter } from "../messaging/types"
import yam_daisy from "./images/yam_daisy/thumbnail.png"
import { Avatar } from "@chakra-ui/react"

interface CharacterThumbnailProps {
  character: ICharacter
}

const THUMBNAILS: { [key: string]: any } = {
  yam_daisy,
}

export default function CharacterThumbnail({
  character,
}: CharacterThumbnailProps) {
  const thumbnail = THUMBNAILS[character.id] as string
  return (
    <Avatar
      src={thumbnail}
      size="lg"
      className="character-avatar"
      name={character.name}
    />
  )
}
