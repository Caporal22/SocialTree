import type { DevTreeLink } from "../types"

type DevTreeInputProps = {
    item: DevTreeLink
}

export default function DevTreeInput({item} : DevTreeInputProps) {

    console.log(item)

  return (
    <div>DevTreeInput</div>
  )
}
