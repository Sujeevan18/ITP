import React, { useState, useEffect } from "react";
import jsPDF from "jspdf"; // Import jsPDF

export default function CustomerRequestDB() {
  const [customerRequest, setCustomerRequest] = useState([]);
  const [editId, setEditId] = useState(-1);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");
  
  // Search state
  const [selectedDateRange, setSelectedDateRange] = useState("");

  // Edit fields
  const [editPickupLocation, setEditPickupLocation] = useState("");
  const [editPickupDate, setEditPickupDate] = useState("");
  const [editPickupTime, setEditPickupTime] = useState("");
  const [editSelectedVehicle, setEditSelectedVehicle] = useState("");

  const apiUrl = "http://localhost:8000/api";

  useEffect(() => {
    getCustomerRequest();
  }, []);

  const getCustomerRequest = () => {
    fetch(apiUrl + "/customerRequest")
      .then((res) => res.json())
      .then((res) => {
        setCustomerRequest(res);
      });
  };

  const handleEdit = (item) => {
    setEditId(item._id);
    setEditPickupLocation(item.pickupLocation);
    setEditPickupDate(item.pickupDate);
    setEditPickupTime(item.pickupTime);
    setEditSelectedVehicle(item.selectedVehicle);
  };

  const handleUpdate = () => {
    setError("");

    if (
      editPickupLocation.trim() !== "" &&
      editPickupDate.trim() !== "" &&
      editPickupTime.trim() !== "" &&
      editSelectedVehicle.trim() !== ""
    ) {
      fetch(apiUrl + "/customerRequest/" + editId, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          pickupLocation: editPickupLocation,
          pickupDate: editPickupDate,
          pickupTime: editPickupTime,
          selectedVehicle: editSelectedVehicle,
        }),
      })
        .then((res) => {
          if (res.ok) {
            const updatedCustomerRequest = customerRequest.map((item) => {
              if (item._id === editId) {
                item.pickupLocation = editPickupLocation;
                item.pickupDate = editPickupDate;
                item.pickupTime = editPickupTime;
                item.selectedVehicle = editSelectedVehicle;
              }
              return item;
            });

            setCustomerRequest(updatedCustomerRequest);
            setSuccessMessage("Customer request updated successfully");
            setError("");
            setTimeout(() => {
              setSuccessMessage("");
            }, 3000);
            setEditId(-1);
          } else {
            setError("Unable to update customer request");
          }
        })
        .catch(() => {
          setError("Failed to fetch");
        });
    } else {
      setError("All fields are required");
    }
  };

  const handleEditCancel = () => {
    setEditId(-1);
  };

  const handleDelete = (id) => {
    if (window.confirm("Are you sure to delete?")) {
      fetch(apiUrl + "/customerRequest/" + id, {
        method: "DELETE",
      }).then(() => {
        const updatedCustomerRequest = customerRequest.filter(
          (item) => item._id !== id
        );
        setCustomerRequest(updatedCustomerRequest);
      });
    }
  };

  // Handle search range selection
  const handleSearchChange = (e) => {
    setSelectedDateRange(e.target.value);
  };

  const filterCustomerRequestsByDateRange = () => {
    if (!selectedDateRange) return customerRequest;

    const [minDay, maxDay] = selectedDateRange.split("-").map(Number);

    return customerRequest.filter((item) => {
      const dayOfMonth = parseInt(item.pickupDate.split("-")[2], 10); // Assuming date format YYYY-MM-DD
      return dayOfMonth >= minDay && dayOfMonth <= maxDay;
    });
  };

  // Function to generate PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    let y = 10; // Starting Y position in PDF
    doc.text("Customer Requests", 10, y);
    y += 10;

    // Add each customer request to PDF
    customerRequest.forEach((item, index) => {
      doc.text(
        `Request ${index + 1}: ${item.pickupLocation}, ${item.pickupDate}, ${item.pickupTime}, ${item.selectedVehicle}`,
        10,
        y
      );
      y += 10;
    });

    // Download the PDF
    doc.save("customer_requests.pdf");
  };

  return (
    <>
      <div className="container mt-3 bg-white">
        <div className="d-flex justify-content-between align-items-center">
          <h1 className="text-4xl font-bold text-center text-gray-800 mt-6 mb-4">
            Customer Requests
          </h1>

          {/* Search Dropdown in Top Right Corner */}
          <div className="form-group" style={{ minWidth: "200px" }}>
            <label htmlFor="date-range">Search by Date Range:</label>
            <select
              id="date-range"
              className="form-select"
              value={selectedDateRange}
              onChange={handleSearchChange}
              style={{ minWidth: "200px", marginLeft: "20px" }}
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
          <button className="btn btn-primary" onClick={exportToPDF}>
            Export to PDF
          </button>
        </div>

        <div className="row mt-3">
          <div className="col-md-12">
            <ul className="list-group">
              {filterCustomerRequestsByDateRange().map((item) => (
                <li
                  className="list-group-item bg-info align-items-center d-flex justify-content-between my-2"
                  key={item._id}
                >
                  <div className="d-flex flex-column">
                    {editId === -1 || editId !== item._id ? (
                      <>
                        <span className="fw-bold">{item.pickupLocation}</span>
                        <span>{item.pickupDate}</span>
                        <span>{item.pickupTime}</span>
                        <span>{item.selectedVehicle}</span>
                      </>
                    ) : (
                      <>
                        <div className="form-group">
                          <label>Pickup Location</label>
                          <input
                            type="text"
                            placeholder="Enter your location"
                            onChange={(e) =>
                              setEditPickupLocation(e.target.value)
                            }
                            value={editPickupLocation}
                          />
                        </div>

                        <div className="form-group">
                          <label>Pickup Date</label>
                          <input
                            type="date"
                            onChange={(e) => setEditPickupDate(e.target.value)}
                            value={editPickupDate}
                          />
                        </div>

                        <div className="form-group">
                          <label>Pickup Time</label>
                          <input
                            type="time"
                            onChange={(e) => setEditPickupTime(e.target.value)}
                            value={editPickupTime}
                          />
                        </div>

                        <div className="form-group">
                          <h2>Vehicle Type</h2>
                          <select
                            onChange={(e) =>
                              setEditSelectedVehicle(e.target.value)
                            }
                            value={editSelectedVehicle}
                          >
                            <option value="" disabled>
                              Select vehicle type
                            </option>
                            <option value="Farmer Vehicle">Farmer Vehicle</option>
                            <option value="Company Vehicle">Company Vehicle</option>
                          </select>
                        </div>
                      </>
                    )}
                  </div>

                  <div className="d-flex gap-2">
                    {editId === -1 || editId !== item._id ? (
                      <button
                        className="btn btn-warning"
                        onClick={() => handleEdit(item)}
                      >
                        Edit
                      </button>
                    ) : (
                      <button
                        className="btn btn-warning"
                        onClick={handleUpdate}
                      >
                        Update
                      </button>
                    )}

                    {editId === -1 ? (
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(item._id)}
                      >
                        Delete
                      </button>
                    ) : (
                      <button
                        className="btn btn-danger"
                        onClick={handleEditCancel}
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
