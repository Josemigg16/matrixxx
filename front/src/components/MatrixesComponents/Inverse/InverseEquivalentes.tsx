import MatrixComponent from '@/components/MatrixComponent'

export default function InverseEquivalentes({equivalente}: {equivalente: any}) {
  return (
    <MatrixComponent matrix={equivalente.matriz} />
  )
}
