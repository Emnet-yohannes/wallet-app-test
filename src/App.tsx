import { Navigate, Route, Routes } from 'react-router-dom'
import { HomePage } from '@/pages/HomePage'
import { NotFoundPage } from '@/pages/NotFoundPage'
import { TransactionDetailPage } from '@/pages/TransactionDetailPage'

export default function App() {
  return (
    <div className="bg-white md:p-3">

    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/transaction/:id" element={<TransactionDetailPage />} />
      <Route path="/404" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/404" replace />} />
    </Routes>
    </div>
  )
}
