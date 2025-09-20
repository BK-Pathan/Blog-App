import React from 'react'

function Logo({ width = '100px' }) {
  return (
    <div className="flex items-center space-x-2">
    
      <img 
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMAs05u9PYfgo7hbHpetcTrC9M466Zvk74lw&s" 
        alt="Logo" 
        className="h-12 w-auto" 
        style={{ width }} 
      />
      
      
      <h5 className="text-xl font-bold text-gray-800">Blog App</h5>
    </div>
  )
}

export default Logo

