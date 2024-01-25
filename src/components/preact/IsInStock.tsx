import { useStore } from '@nanostores/preact'
import { isInStock } from './cartStore'
import { Badge } from './Badge'

export default function IsInStock() {
  const $isInStock = useStore(isInStock)
  return <Badge>{$isInStock ? 'In Stock' : 'Out Of Stock'}</Badge>
}
