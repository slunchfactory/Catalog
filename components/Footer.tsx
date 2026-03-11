export function Footer() {
  return (
    <footer className="border-t border-gray-100 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-400">
            © {new Date().getFullYear()} Slunch Factory. All rights reserved.
          </p>
          <p className="text-xs text-gray-400">
            FSSC 22000 · ISO 22000 · HACCP Certified
          </p>
        </div>
      </div>
    </footer>
  )
}
