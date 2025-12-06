import React, { useEffect, useState } from "react";
import './EventsPage.css'; 

const monthNames = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];

const EventsPage = () => {
  const [eventsData, setEventsData] = useState([]);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [upcomingYears, setUpcomingYears] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await fetch("/Events.json");
        const data = await res.json();
        
        const today = new Date();
        today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison
        
        const filteredData = data.map((yearObj) => {
          const futureEvents = yearObj.events.filter(ev => {
            const eventDate = new Date(ev.date);
            eventDate.setHours(0, 0, 0, 0);
            return eventDate >= today;
          });
          return { ...yearObj, events: futureEvents };
        }).filter(yearObj => yearObj.events.length > 0);

        setEventsData(filteredData);
        const years = filteredData.map(y => y.year);
        setUpcomingYears(years);
        if (years.length > 0) {
          setSelectedYear(years[0]);
        }
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const handleYearClick = (year) => {
    setSelectedYear(year);
    setSelectedMonth(null);
  };

  const handleMonthClick = (monthIndex) => {
    setSelectedMonth(monthIndex);
  };

  const currentYearData = eventsData.find(y => y.year === selectedYear);
  const monthsWithEvents = currentYearData 
    ? Array.from(new Set(currentYearData.events.map(ev => new Date(ev.date).getMonth())))
        .sort((a, b) => a - b)
    : [];

  const displayedEvents = currentYearData
    ? currentYearData.events.filter(ev => 
        selectedMonth === null ? true : new Date(ev.date).getMonth() === selectedMonth
      )
    : [];

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getDate()} ${monthNames[date.getMonth()].substring(0, 3)}`;
  };

  if (loading) {
    return (
      <div className="events-container">
        <div className="loading-spinner">
          <div className="spinner"></div>
          <p>Loading events...</p>
        </div>
      </div>
    );
  }

  if (!eventsData.length) {
    return (
      <div className="events-container">
        <div className="no-events">
          <div className="calendar-icon">📅</div>
          <h2>No Upcoming Events</h2>
          <p>Check back soon for exciting new events!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="events-container">
      {/* Header Section */}
      <div className="events-header">
        <div className="header-content">
          <h1 className="page-title">Upcoming Events</h1>
          <p className="page-subtitle">Discover and join our upcoming activities</p>
        </div>
        {/* <div className="events-counter">
          <span className="counter-number">{displayedEvents.length}</span>
          <span className="counter-text">Events Found</span>
        </div> */}
      </div>

      {/* Filters Section */}
      <div className="filters-section">
        {/* Year Filters */}
        <div className="filter-group">
          <div className="filter-label">Filter by Year</div>
          <div className="year-filters">
            {upcomingYears.map(year => (
              <button
                key={year}
                onClick={() => handleYearClick(year)}
                className={`year-filter-btn ${selectedYear === year ? 'active' : ''}`}
              >
                {year}
              </button>
            ))}
          </div>
        </div>

        {/* Month Filters */}
        {monthsWithEvents.length > 0 && (
          <div className="filter-group">
            <div className="filter-label">Filter by Month</div>
            <div className="month-filters">
              {monthsWithEvents.map(monthIndex => (
                <button
                  key={monthIndex}
                  onClick={() => handleMonthClick(monthIndex)}
                  className={`month-filter-btn ${selectedMonth === monthIndex ? 'active' : ''}`}
                >
                  {monthNames[monthIndex].substring(0, 3)}
                </button>
              ))}
              <button
                onClick={() => setSelectedMonth(null)}
                className={`month-filter-btn ${selectedMonth === null ? 'active' : 'all-months'}`}
              >
                All Months
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Events Grid */}
      {displayedEvents.length > 0 ? (
        <div className="events-grid">
          {displayedEvents.map((ev, index) => (
            <div key={index} className="event-card">
              <div className="event-header">
                <div className="event-date">
                  <span className="date-day">{formatDate(ev.date).split(' ')[0]}</span>
                  <span className="date-month">{formatDate(ev.date).split(' ')[1]}</span>
                </div>
                <div className="event-title-section">
                  <h3 className="event-title">{ev.event}</h3>
                  <div className="event-meta">
                    <span className="event-region">{ev.region}</span>
                    <span className="event-type">{ev.type}</span>
                  </div>
                </div>
              </div>
              
              <div className="event-body">
                <p className="event-description">{ev.description}</p>
              </div>
              
              {/* <div className="event-footer">
                <div className="event-details">
                  <span className="full-date">{ev.date}</span>
                </div>
                <button className="event-action-btn">
                  View Details
                </button>
              </div> */}
            </div>
          ))}
        </div>
      ) : (
        <div className="no-events-filter">
          <div className="filter-icon">🔍</div>
          <h3>No Events Found</h3>
          <p>Try selecting different filters to see more events</p>
          <button 
            onClick={() => setSelectedMonth(null)}
            className="clear-filter-btn"
          >
            Clear Month Filter
          </button>
        </div>
      )}

      {/* Current Selection Info */}
      <div className="selection-info">
        <span className="info-text">
          Showing events for <strong>{selectedYear}</strong>
          {selectedMonth !== null && (
            <> in <strong>{monthNames[selectedMonth]}</strong></>
          )}
        </span>
      </div>
    </div>
  );
};

export default EventsPage;