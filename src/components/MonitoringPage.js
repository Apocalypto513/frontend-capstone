import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import biodegradableIcon from '../assets/biodegradable.png';
import nonBiodegradableIcon from '../assets/non-biodegradable.png';
import unidentifiedIcon from '../assets/unidentified.png';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement,
  LineElement,
  PointElement,
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { Modal, Button } from 'react-bootstrap';

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const WasteCollection = ({ icon, type, amount }) => (
  <div className="waste-collection-item">
    <img src={icon} alt={type} className="waste-icon" />
    <div className="waste-details">
      <div className="waste-type">{type}</div>
      <div className="waste-amount">{amount}</div>
    </div>
  </div>
);

const MonitoringPage = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDateChange = (update) => {
    setDateRange(update);
    if (update[0] && update[1]) {
      setShowConfirmation(true);
    }
  };

  const formatDateRange = () => {
    if (startDate && endDate) {
      return `${startDate.toLocaleDateString()} - ${endDate.toLocaleDateString()}`;
    }
    return "Select Date Range";
  };

  // Update the lineChartData colors
  const lineChartData = {
    labels: ['July 1', 'July 2', 'July 3', 'July 4', 'July 5', 'July 6', 'July 7'],
    datasets: [
      {
        label: 'Biodegradable',
        data: [4.2, 2.6, 3.2, 4.5, 5.6, 4.5, 8.6],
        borderColor: 'rgb(102, 176, 50)', // Green circle color
        backgroundColor: 'rgb(102, 176, 50)',
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: 'Non-Biodegradable',
        data: [2.0, 4.3, 1.8, 3.0, 4.8, 5.8, 9.8],
        borderColor: 'rgb(255, 192, 0)', // Yellow circle color
        backgroundColor: 'rgb(255, 192, 0)',
        tension: 0.4,
        pointRadius: 5,
      },
      {
        label: 'Unidentified Waste',
        data: [2.0, 2.0, 2.8, 4.9, 2.0, 4.9, 2.0],
        borderColor: 'rgb(237, 125, 49)', // Orange circle color
        backgroundColor: 'rgb(237, 125, 49)',
        tension: 0.4,
        pointRadius: 5,
      }
    ]
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        max: 10,
        ticks: {
          stepSize: 1
        }
      }
    },
    plugins: {
      legend: {
        display: false // Remove legend from chart since we have it in side panel
      }
    }
  };

  const TotalWasteCard = () => (
    <div className="total-waste-card">
      <h3>Total Waste Collected</h3>
      <div className="waste-item">
        <img src={biodegradableIcon} alt="Biodegradable" />
        <span>Biodegradable:</span>
        <span className="amount">15</span>
      </div>
      <div className="waste-item">
        <img src={nonBiodegradableIcon} alt="Non-Biodegradable" />
        <span>Non-Biodegradable:</span>
        <span className="amount">29</span>
      </div>
      <div className="waste-item">
        <img src={unidentifiedIcon} alt="Unidentified" />
        <span>Unidentified Waste:</span>
        <span className="amount">37</span>
      </div>
    </div>
  );

  // Update the Legend component
  const Legend = () => (
    <div className="legend-card">
      <h3>LEGEND</h3>
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: 'rgb(102, 176, 50)' }}></div>
        <span>Biodegradable</span>
      </div>
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: 'rgb(255, 192, 0)' }}></div>
        <span>Non-Biodegradable</span>
      </div>
      <div className="legend-item">
        <div className="legend-color" style={{ backgroundColor: 'rgb(237, 125, 49)' }}></div>
        <span>Unidentified Waste</span>
      </div>
    </div>
  );

  return (
    <div className="monitoring-page">
      <h2 className="page-title">Monitoring</h2>
      
      <div className="monitoring-content">
        <div className="main-section">
          <div className="date-selector">
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              onChange={handleDateChange}
              isClearable={true}
              showMonthDropdown
              showYearDropdown
              dropdownMode="select"
              placeholderText="Select Date Range"
              className="form-control date-range-picker"
              dateFormat="MMM d, yyyy"
              customInput={
                <input
                  type="text"
                  className="form-control"
                  style={{ backgroundColor: 'white', cursor: 'pointer' }}
                />
              }
            />
          </div>

          <div className="chart-container">
            <Line data={lineChartData} options={chartOptions} />
          </div>
          <div className="print-button-container">
            <button className="print-button">Print</button>
          </div>

          <div className="waste-info-container">
            <div className="waste-date">
              Waste Collected: {formatDateRange()}
            </div>
            <div className="waste-stats-card">
              <div className="waste-stat-item">
                <img src={biodegradableIcon} alt="Biodegradable" />
                <div className="waste-type">Biodegradable:</div>
                <div className="waste-amount">15</div>
              </div>
              <div className="waste-stat-item">
                <img src={nonBiodegradableIcon} alt="Non-Biodegradable" />
                <div className="waste-type">Non-Biodegradable:</div>
                <div className="waste-amount">25</div>
              </div>
              <div className="waste-stat-item">
                <img src={unidentifiedIcon} alt="Unidentified Waste" />
                <div className="waste-type">Unidentified Waste:</div>
                <div className="waste-amount">36</div>
              </div>
            </div>
          </div>

          {/* Add footer */}
          <div className="footer white">
            © 2025 Leyte Normal University, All rights reserved.
          </div>
        </div>

        <div className="side-section">
          <div className="total-waste-card">
            <h3>Total Waste Collected</h3>
            <div className="waste-item">
              <img src={biodegradableIcon} alt="Biodegradable" />
              <span>Biodegradable:</span>
              <span className="amount">15</span>
            </div>
            <div className="waste-item">
              <img src={nonBiodegradableIcon} alt="Non-Biodegradable" />
              <span>Non-Biodegradable:</span>
              <span className="amount">29</span>
            </div>
            <div className="waste-item">
              <img src={unidentifiedIcon} alt="Unidentified" />
              <span>Unidentified Waste:</span>
              <span className="amount">37</span>
            </div>
          </div>

          <div className="legend-card">
            <h3>LEGEND</h3>
            <div className="legend-item">
              <div className="legend-color biodegradable"></div>
              <span>Biodegradable</span>
            </div>
            <div className="legend-item">
              <div className="legend-color non-biodegradable"></div>
              <span>Non-Biodegradable</span>
            </div>
            <div className="legend-item">
              <div className="legend-color unidentified"></div>
              <span>Unidentified Waste</span>
            </div>
          </div>
        </div>
      </div>

      {/* Add confirmation modal */}
      <Modal show={showConfirmation} onHide={() => setShowConfirmation(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Date Range</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Do you want to view data for the period: {formatDateRange()}?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmation(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={() => {
            // Handle confirmed date range here
            setShowConfirmation(false);
            // Update your chart data based on the selected range
          }}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MonitoringPage;