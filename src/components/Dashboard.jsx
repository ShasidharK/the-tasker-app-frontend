import React, { useState } from 'react'
import Boards from './Boards'
import BoardView from './BoardView'

function Dashboard() {
  const [selectedBoard, setSelectedBoard] = useState(null)

  return (
    <div className="dashboard-container">
      {!selectedBoard ? (
        <Boards onSelectBoard={setSelectedBoard} />
      ) : (
        <BoardView board={selectedBoard} onBack={() => setSelectedBoard(null)} />
      )}
    </div>
  )
}

export default Dashboard