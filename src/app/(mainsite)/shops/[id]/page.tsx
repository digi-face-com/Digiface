import ShopDetail from './shop-detail'

export function generateStaticParams() {
  return [{ id: '1' }]
}

export default function ShopDetailPage() {
  return <ShopDetail />
}
