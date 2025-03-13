import { Home, Package, Settings, Users } from 'lucide-react'
import React from 'react'
import { NavLink } from 'react-router-dom'

function StaticSidebar() {
  return (
    <aside className="w-64 bg-gray-100 border-r min-h-screen p-6 flex-shrink-0">
      <div className="flex items-center gap-2 border-b pb-4">
        <Package className="h-6 w-6" />
        <span className="text-lg font-bold">Company</span>
      </div>
      <nav className="mt-6 space-y-4">
        <NavLink to="/dashboard" className={({ isActive }) => `flex items-center p-2 rounded-md transition-colors ${isActive ? "bg-gray-300 text-black" : "text-gray-700 hover:bg-gray-200 hover:text-black"}`}>
          <Home className="mr-2 h-5 w-5" /> Dashboard
        </NavLink>
        <NavLink to="/employees" className={({ isActive }) => `flex items-center p-2 rounded-md transition-colors ${isActive ? "bg-gray-300 text-black" : "text-gray-700 hover:bg-gray-200 hover:text-black"}`}>
          <Users className="mr-2 h-5 w-5" /> Employees
        </NavLink>
        <NavLink to="/departments" className={({ isActive }) => `flex items-center p-2 rounded-md transition-colors ${isActive ? "bg-gray-300 text-black" : "text-gray-700 hover:bg-gray-200 hover:text-black"}`}>
          <Settings className="mr-2 h-5 w-5" /> Departments
        </NavLink>
      </nav>
    </aside>
  )
}

export default StaticSidebar;
