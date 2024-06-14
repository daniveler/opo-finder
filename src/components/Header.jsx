const Header = () => {
  return (
    <header>
      <nav className="mt-8 font-medium text-pink-500 bg-pink-200">
        <div className="flex flex-row w-[800px] justify-center items-center">
          <a className="w-1/3 py-6 hover:bg-pink-100 text-center" href="/boe">BOE</a>
          <a className="w-1/3 py-6 hover:bg-pink-100 text-center" href="/bocyl">BOCyL</a>
          <a className="w-1/3 py-6 hover:bg-pink-100 text-center" href="/bops">BOPs</a>
        </div>
      </nav>
    </header>
  )
}

export default Header