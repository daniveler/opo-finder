const Header = ({children}) => {
  return (
    <header>
      <nav className="flex flex-row justify-center items-center gap-x-8 mt-8 py-6 font-medium text-pink-500 bg-pink-200">
        <a href="/boe">BOE</a>
        <a href="/bocyl">BOCyL</a>
        <a href="/bops">BOPs</a>
      </nav>
    </header>
  )
}

export default Header