// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// export default function FarmerReq() {
//   const [location, setLocation] = useState(""); // Changed from pickupLocation to location
//   const [date, setDate] = useState("");         // Changed from pickupDate to date
//   const [time, setTime] = useState("");         // Changed from pickupTime to time
//   const [selectedVehicle, setSelectedVehicle] = useState("");
//   const [farmerRequest, setFarmerRequest] = useState([]);
//   const [successMessage, setSuccessMessage] = useState("");
//   const [error, setError] = useState("");

//   const navigate = useNavigate();
//   const apiUrl = "http://localhost:8000/api";

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError("");
//     if (location.trim() !== "" && date.trim() !== "" && time.trim() !== "" && selectedVehicle.trim() !== "") {
//       const requestData = {
//         location,  // Use location
//         date,      // Use date
//         time,      // Use time
//         vehicleOption: selectedVehicle,
//       };

//       console.log("Sending request with data:", requestData);  // Log the request data

//       fetch(apiUrl + "/farmerRequest", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(requestData),
//       })
//         .then((res) =>
//           res.json().then((data) => {
//             console.log("Server response:", data);  // Log the server response
//             return { status: res.status, body: data };
//           })
//         )
//         .then((result) => {
//           if (result.ok) {
//             setFarmerRequest([...farmerRequest, requestData]);
//             setSuccessMessage("Farmer request added successfully");
//             // setTimeout(() => setSuccessMessage(""), 3000);
//             navigate("/farmerRequestDB");
//           } else {
//             // setError(result.body.message || "Unable to create farmer request");
//           }
//         })
//         .catch((err) => {
//           console.error("Fetch error:", err);
//           setError("Failed to fetch. Check server connection.");
//         });
//     } else {
//       setError("All fields are required");
//     }
//   };


//   return (
//     <>
//       <div className="container mx-auto max-w-xl p-4 min-h-screen">
//         {/* Header */}
//         <header className="fixed top-0 left-0 w-full bg-green-600 text-white p-3 z-50 flex justify-between items-center shadow-md transition-all duration-500 transform hover:scale-105">
//           <div className="text-lg">G S P Traders</div>
//           <nav className="space-x-4">
//             <a href="http://localhost:3000/FarmerRequest" className="hover:underline">
//               Farmer PickUp Request
//             </a>
//             <a href="http://localhost:3000/customerRequest" className="hover:underline">
//               Customer Delivery Request
//             </a>
//           </nav>
//           <button className="text-2xl transition-transform duration-500 hover:rotate-90">☰</button>
//         </header>

//         {/* Main content */}
//         <main className="pt-16">
//           <div className="bg-cover bg-center p-4" style={{ backgroundImage: "url('./Farmercrops.jpg')" }}>
//             <div className="bg-white bg-opacity-90 p-6 rounded-lg max-w-md mx-auto shadow-lg animate-fadeIn">
//               <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center transition duration-300 transform hover:scale-105">
//                 Farmer PickUp Request
//               </h2>

//               <form onSubmit={handleSubmit} className="space-y-4">
//                 {/* Pickup Location */}
//                 <div className="mb-4">
//                   <label
//                     htmlFor="location"
//                     className="block text-left text-base font-semibold text-gray-600 mb-1"
//                   >
//                     Pickup Location
//                   </label>
//                   <input
//                                       type="text"
//                                       id="location" // Updated id to match the state variable
//                                       placeholder="Enter your location"
//                                       onChange={(e) => setLocation(e.target.value)} // Updated function to setLocation
//                                       value={location} // Updated value to location
//                                       className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
//                                     />
//                                   </div>

//                                   {/* Pickup Date */}
//                                   <div className="mb-4">
//                                     <label
//                                       htmlFor="date"
//                                       className="block text-left text-base font-semibold text-gray-600 mb-1"
//                                     >
//                                       PickUp Date
//                                     </label>
//                                     <input
//                                       type="date"
//                                       id="date" // Updated id to match the state variable
//                                       onChange={(e) => setDate(e.target.value)} // Updated function to setDate
//                                       value={date} // Updated value to date
//                                       className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
//                                     />
//                                   </div>

//                                   {/* Pickup Time */}
//                                   <div className="mb-4">
//                                     <label
//                                       htmlFor="time"
//                                       className="block text-left text-base font-semibold text-gray-600 mb-1"
//                                     >
//                                       PickUp Time
//                                     </label>
//                                     <input
//                                       type="time"
//                                       id="time" // Updated id to match the state variable
//                                       onChange={(e) => setTime(e.target.value)} // Updated function to setTime
//                                       value={time} // Updated value to time
//                                       className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
//                                     />
//                                   </div>

//                                   {/* Vehicle Type */}
//                                   <div className="mb-4">
//                                     <h3 className="text-left text-base font-semibold text-gray-600 mb-1">
//                                       Vehicle Type
//                                     </h3>
//                                     <select
//                                       onChange={(e) => setSelectedVehicle(e.target.value)}
//                                       value={selectedVehicle}
//                                       className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
//                                     >
//                                       <option value="" disabled>
//                                         Select vehicle type
//                                       </option>
//                                       <option value="Farmer Vehicle">Farmer Vehicle</option>
//                                       <option value="Company Vehicle">Company Vehicle</option>
//                                     </select>
//                                   </div>

//                                   {/* Submit Button */}
//                                   <button
//                                     type="submit"
//                                     className="w-full py-2 bg-gradient-to-r from-black to-gray-800 text-white rounded hover:from-gray-800 hover:to-gray-900 focus:outline-none shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
//                                   >
//                                     Submit Delivery Schedule
//                                   </button>

//                                   {/* Success/Error Messages */}
//                                   {successMessage && (
//                                     <p className="text-green-500 mt-4 text-center animate-pulse">
//                                       {successMessage}
//                                     </p>
//                                   )}
//                                   {error && (
//                                     <p className="text-red-500 mt-4 text-center animate-shake">
//                                       {error}
//                                     </p>
//                                   )}
//                                 </form>
//                               </div>
//                             </div>
//                           </main>
//                         </div>
//                       </>
//                     );
//                   }


import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function FarmerReq() {
  const [location, setLocation] = useState(""); // Changed from pickupLocation to location
  const [date, setDate] = useState("");         // Changed from pickupDate to date
  const [time, setTime] = useState("");         // Changed from pickupTime to time
  const [selectedVehicle, setSelectedVehicle] = useState("");
  const [farmerRequest, setFarmerRequest] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const apiUrl = "http://localhost:8000/api";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    if (location.trim() !== "" && date.trim() !== "" && time.trim() !== "" && selectedVehicle.trim() !== "") {
      const requestData = {
        location,  // Use location
        date,      // Use date
        time,      // Use time
        vehicleOption: selectedVehicle,
      };

      console.log("Sending request with data:", requestData);  // Log the request data

      fetch(apiUrl + "/farmerRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestData),
      })
        .then((res) => {
          if (res.ok) {
            return res.json();  // Parse the response if request is successful
          } else {
            throw new Error("Failed to create farmer request");
          }
        })
        .then((data) => {
          console.log("Server response:", data);  // Log the server response
          setFarmerRequest([...farmerRequest, requestData]);
          setSuccessMessage("Farmer request added successfully");
          // Redirect to FarmerRequestDB page after success
          navigate("/farmerRequestDB");
        })
        .catch((err) => {
          console.error("Fetch error:", err);
          setError("Failed to fetch. Check server connection.");
        });
    } else {
      setError("All fields are required");
    }
  };

  return (
    <>
      <div className="container mx-auto max-w-xl p-4 min-h-screen">
        {/* Header */}
        <header className="fixed top-0 left-0 w-full bg-green-600 text-white p-3 z-50 flex justify-between items-center shadow-md transition-all duration-500 transform hover:scale-105">
          <div className="text-lg">G S P Traders</div>
          <nav className="space-x-4">
            <a href="http://localhost:3000/FarmerRequest" className="hover:underline">
              Farmer PickUp Request
            </a>
            <a href="http://localhost:3000/customerRequest" className="hover:underline">
              Customer Delivery Request
            </a>
          </nav>
          <button className="text-2xl transition-transform duration-500 hover:rotate-90">☰</button>
        </header>

        {/* Main content */}
        <main className="pt-16">
          <div className="bg-cover bg-center p-4" style={{ backgroundImage: "url('./Farmercrops.jpg')" }}>
            <div className="bg-white bg-opacity-90 p-6 rounded-lg max-w-md mx-auto shadow-lg animate-fadeIn">
              <h2 className="text-2xl font-semibold mb-4 text-gray-700 text-center transition duration-300 transform hover:scale-105">
                Farmer PickUp Request
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Pickup Location */}
                <div className="mb-4">
                  <label
                    htmlFor="location"
                    className="block text-left text-base font-semibold text-gray-600 mb-1"
                  >
                    Pickup Location
                  </label>
                  <input
                    type="text"
                    id="location"
                    placeholder="Enter your location"
                    onChange={(e) => setLocation(e.target.value)}
                    value={location}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                  />
                </div>

                {/* Pickup Date */}
                <div className="mb-4">
                  <label
                    htmlFor="date"
                    className="block text-left text-base font-semibold text-gray-600 mb-1"
                  >
                    PickUp Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    onChange={(e) => setDate(e.target.value)}
                    value={date}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                  />
                </div>

                {/* Pickup Time */}
                <div className="mb-4">
                  <label
                    htmlFor="time"
                    className="block text-left text-base font-semibold text-gray-600 mb-1"
                  >
                    PickUp Time
                  </label>
                  <input
                    type="time"
                    id="time"
                    onChange={(e) => setTime(e.target.value)}
                    value={time}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                  />
                </div>

                {/* Vehicle Type */}
                <div className="mb-4">
                  <h3 className="text-left text-base font-semibold text-gray-600 mb-1">
                    Vehicle Type
                  </h3>
                  <select
                    onChange={(e) => setSelectedVehicle(e.target.value)}
                    value={selectedVehicle}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500 transition duration-300"
                  >
                    <option value="" disabled>
                      Select vehicle type
                    </option>
                    <option value="Farmer Vehicle">Farmer Vehicle</option>
                    <option value="Company Vehicle">Company Vehicle</option>
                  </select>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="w-full py-2 bg-gradient-to-r from-black to-gray-800 text-white rounded hover:from-gray-800 hover:to-gray-900 focus:outline-none shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
                >
                  Submit Delivery Schedule
                </button>

                {/* Success/Error Messages */}
                {successMessage && (
                  <p className="text-green-500 mt-4 text-center animate-pulse">
                    {successMessage}
                  </p>
                )}
                {error && (
                  <p className="text-red-500 mt-4 text-center animate-shake">
                    {error}
                  </p>
                )}
              </form>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}
