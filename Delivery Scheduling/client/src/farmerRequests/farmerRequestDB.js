import React, { useState, useEffect } from "react";
import jsPDF from "jspdf";

export default function FarmerRequestDB() {
  const [farmerRequest, setFarmerRequest] = useState([]);
  const [editId, setEditId] = useState(-1);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  // Edit
  const [editLocation, setEditLocation] = useState("");
  const [editDate, setEditDate] = useState("");
  const [editTime, setEditTime] = useState("");
  const [editSelectedVehicle, setEditSelectedVehicle] = useState("");

  // Search filter
  const [selectedDateRange, setSelectedDateRange] = useState("");

  const apiUrl = "http://localhost:8000/api";

  useEffect(() => {
    getFarmerRequest();
  }, []);

  const getFarmerRequest = () => {
    fetch(apiUrl + "/farmerRequest")
      .then((res) => res.json())
      .then((res) => {
        setFarmerRequest(res);
      });
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditLocation(item.location);
    setEditDate(item.date);
    setEditTime(item.time);
    setEditSelectedVehicle(item.selectedVehicle);
  };

  const handleEditCancel = () => {
    setEditId(-1);
  };

  const handleUpdate = () => {
    setError("");

    if (editLocation.trim() && editDate.trim() && editTime.trim() && editSelectedVehicle.trim()) {
      fetch(apiUrl + "/farmerRequest/" + editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          location: editLocation,
          date: editDate,
          time: editTime,
          selectedVehicle: editSelectedVehicle,
        }),
      })
        .then((res) => {
          if (res.ok) {
            const updatedFarmerRequest = farmerRequest.map((item) => {
              if (item._id === editId) {
                item.location = editLocation;
                item.date = editDate;
                item.time = editTime;
                item.selectedVehicle = editSelectedVehicle;
              }
              return item;
            });

            setFarmerRequest(updatedFarmerRequest);
            setSuccessMessage("Farmer request updated successfully");
            setError("");
            setTimeout(() => {
              setSuccessMessage("");
            }, 3000);

            setEditId(-1);
          } else {
            setError("Unable to update farmer request");
          }
        })
        .catch(() => {
          setError("Failed to fetch");
        });
    } else {
      setError("All fields are required.");
    }
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      fetch(apiUrl + "/farmerRequest/" + id, {
        method: "DELETE",
      }).then(() => {
        const updatedFarmerRequest = farmerRequest.filter((item) => item._id !== id);
        setFarmerRequest(updatedFarmerRequest);
      });
    }
  };

  const handleSearchChange = (e) => {
    setSelectedDateRange(e.target.value);
  };

  const filterFarmerRequestsByDateRange = () => {
    if (selectedDateRange === "") return farmerRequest;

    const dateRange = selectedDateRange.split("-");
    const minDay = parseInt(dateRange[0], 10);
    const maxDay = parseInt(dateRange[1], 10);

    return farmerRequest.filter((item) => {
      const dayOfMonth = parseInt(item.date.split("-")[2], 10); // Assuming date format YYYY-MM-DD
      return dayOfMonth >= minDay && dayOfMonth <= maxDay;
    });
  };

  const exportPDF = () => {
    const doc = new jsPDF();
    doc.text("Farmer Requests", 10, 10);

    farmerRequest.forEach((item, index) => {
      doc.text(
        `${index + 1}. Location: ${item.location}, Date: ${item.date}, Time: ${item.time}, Vehicle: ${item.selectedVehicle}`,
        10,
        20 + index * 10
      );
    });

    doc.save("farmer_requests.pdf");
  };

  return (
    <div className="container mt-3 bg-white">
      <div className="d-flex justify-content-between align-items-center">
        <h1 className="text-4xl font-bold text-center text-gray-800 mt-6 mb-4">Farmer Requests</h1>
        
        {/* Search Filter Dropdown */}
        <div className="form-group mr-4">
          <label htmlFor="date-range">Filter by Date Range:</label>
          <select
            id="date-range"
            className="form-select"
            value={selectedDateRange}
            onChange={handleSearchChange}
          >
            <option value="">All Dates</option>
            <option value="1-5">1-5</option>
            <option value="6-10">6-10</option>
            <option value="11-15">11-15</option>
            <option value="16-20">16-20</option>
            <option value="21-25">21-25</option>
            <option value="26-30">26-30</option>
          </select>
        </div>

        {/* Export PDF Button */}
        <button onClick={exportPDF} className="btn btn-primary">
          Export PDF
        </button>
      </div>

      <ul className="list-group mt-3">
        {filterFarmerRequestsByDateRange().map((item) => (
          <li
            className="list-group-item bg-info align-items-center d-flex justify-content-between my-2"
            key={item._id}
          >
            <div className="d-flex flex-column me-2">
              {editId === -1 || editId !== item._id ? (
                <>
                  <span className="fw-bold">{item.location}</span>
                  <span>{item.date}</span>
                  <span>{item.time}</span>
                  <span>{item.selectedVehicle}</span>
                </>
              ) : (
                <div>
                  <div className="form-group">
                    <label htmlFor="pickup-location">Pickup Location</label>
                    <input
                      type="text"
                      id="pickup-location"
                      placeholder="Enter your location"
                      onChange={(e) => setEditLocation(e.target.value)}
                      value={editLocation}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pickup-date">PickUp Date</label>
                    <input
                      type="text"
                      id="pickup-date"
                      placeholder="PickUp Date"
                      onChange={(e) => setEditDate(e.target.value)}
                      value={editDate}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="pickup-time">PickUp Time</label>
                    <input
                      type="text"
                      id="pickup-time"
                      placeholder="PickUp Time"
                      onChange={(e) => setEditTime(e.target.value)}
                      value={editTime}
                    />
                  </div>

                  <div className="form-group">
                    <h2>Vehicle Type</h2>
                    <select
                      onChange={(e) => setEditSelectedVehicle(e.target.value)}
                      value={editSelectedVehicle}
                    >
                      <option value="" disabled>
                        Select vehicle type
                      </option>
                      <option value="Farmer Vehicle">Farmer Vehicle</option>
                      <option value="Company Vehicle">Company Vehicle</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
            <div className="d-flex gap-2">
              {editId === -1 || editId !== item._id ? (
                <button className="btn btn-warning" onClick={() => handleEdit(item)}>
                  Edit
                </button>
              ) : (
                <button className="btn btn-warning" onClick={handleUpdate}>Update</button>
              )}
              {editId === -1 ? (
                <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>
                  Delete
                </button>
              ) : (
                <button className="btn btn-danger" onClick={handleEditCancel}>
                  Cancel
                </button>
              )}
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
