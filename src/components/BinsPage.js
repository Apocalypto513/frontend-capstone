import React from 'react';

const BinsPage = () => {
  // Simulated bin data
  const bins = [
    { id: 1, type: 'Biodegradable', level: 60, color: '#f0e68c' },
    { id: 2, type: 'Non-Biodegradable', level: 25, color: '#add8e6' },
    { id: 3, type: 'Unidentified Waste', level: 38, color: '#90EE90' }
  ];

  return (
    <div className="bins-page">
      <h2 className="page-title mb-5">Bins</h2>
      
      <div className="row justify-content-center">
        {bins.map(bin => (
          <div key={bin.id} className="col-md-4 text-center mb-5">
            <div className="bin-container">
              {/* Bin graphic */}
              <div className="bin-graphic">
                <div className="bin-top"></div>
                <div className="bin-body">
                  <div className="bin-level-text">{bin.level}%</div>
                  <div 
                    className="bin-level" 
                    style={{ 
                      height: `${bin.level}%`, 
                      backgroundColor: bin.color 
                    }}
                  ></div>
                </div>
              </div>
              <div className="bin-label mt-3">
                {bin.type}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Add footer */}
      <div className="footer white">
        © 2025 Leyte Normal University, All rights reserved.
      </div>
    </div>
  );
};

export default BinsPage;