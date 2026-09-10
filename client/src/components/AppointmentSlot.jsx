import React, { useState } from 'react';
import './AppointmentSlot.css';
import { FaClock, FaCalendar } from 'react-icons/fa';

const AppointmentSlot = ({ doctor, onBooking }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [loading, setLoading] = useState(false);

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const handleBook = async () => {
    if (!selectedDate || !selectedTime) {
      alert('Please select date and time');
      return;
    }

    setLoading(true);
    try {
      await onBooking({
        doctorId: doctor.id,
        appointmentDate: selectedDate,
        slotTime: selectedTime,
        notes: notes
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="appointment-slot">
      <h3>Book Appointment with Dr. {doctor.name}</h3>

      <div className="slot-form">
        <div className="form-group">
          <label htmlFor="date">
            <FaCalendar /> Select Date
          </label>
          <input
            id="date"
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            min={new Date().toISOString().split('T')[0]}
          />
        </div>

        <div className="form-group">
          <label>
            <FaClock /> Select Time
          </label>
          <div className="time-slots">
            {timeSlots.map((time) => (
              <button
                key={time}
                className={`time-slot ${selectedTime === time ? 'selected' : ''}`}
                onClick={() => setSelectedTime(time)}
              >
                {time}
              </button>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="notes">Notes (Optional)</label>
          <textarea
            id="notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any symptoms or concerns..."
            rows="4"
          />
        </div>

        <div className="slot-summary">
          {selectedDate && selectedTime && (
            <>
              <p><strong>Appointment Summary:</strong></p>
              <p>Doctor: Dr. {doctor.name}</p>
              <p>Date: {new Date(selectedDate).toLocaleDateString()}</p>
              <p>Time: {selectedTime}</p>
              <p>Fee: ₹{doctor.fee}</p>
            </>
          )}
        </div>

        <button
          className="btn-confirm"
          onClick={handleBook}
          disabled={!selectedDate || !selectedTime || loading}
        >
          {loading ? 'Booking...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
};

export default AppointmentSlot;
