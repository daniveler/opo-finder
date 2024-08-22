import { NavLink } from "react-router-dom"

const Tab = ({ route, children }) => {
  return (
    <NavLink
      to={route}
      className={({ isActive }) => isActive
        ? "w-1/3 py-4 text-center text-pink-500 border-b-4 border-pink-500 transition duration-300 ease-linear"
        : "w-1/3 py-4 text-center transition duration-300 ease-linear"}>
      {children}
    </NavLink>

  )
}

export default Tab