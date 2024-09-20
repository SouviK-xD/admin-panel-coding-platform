import React from 'react'
import { CFooter } from '@coreui/react'

const AppFooter = () => {
  return (
    <CFooter className="px-4">
      <div>
        <a href="https://coreui.io" target="_blank" rel="noopener noreferrer">
          CoreUI
        </a>
        <span className="ms-1">&copy; 2024 MSL.</span>
      </div>
      <div className="ms-auto">
        <span className="me-1">Powered by</span>
        <a href="https://www.mittalsoftwarelabs.com/" target="_blank" rel="noopener noreferrer">
          Mittal Software Labs 
        </a>
      </div>
    </CFooter>
  )
}

export default React.memo(AppFooter)
