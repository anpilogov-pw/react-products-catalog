function NotFoundPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404</h1>
      <p className="text-gray-600 mb-8">Страница не найдена</p>
      <a href="/" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
        На главную
      </a>
    </div>
  )
}

export default NotFoundPage