import React, { useState } from "react";
import timelessstyle2 from "../assets/timeless-style-2.png";
import salonbg from "../assets/salonbg.jpeg";

interface Contact {
  id: number;
  name: string;
  address: string;
  phone: string;
  state: string;
  image: string;
}

const branches: Contact[] = [
  { id: 1, name: "Suria KLCC", address: "Lot 403B, 4th Floor, Suria KLCC, 50088 Kuala Lumpur", phone: "03-2161 6788", state: "Kuala Lumpur", image: salonbg },
  { id: 2, name: "1 Utama Damansara", address: "Lot S-215, 2nd Floor, 1 Utama Shopping Centre, 47800 Petaling Jaya", phone: "03-7726 9988", state: "Selangor", image: timelessstyle2 },
  { id: 3, name: "Mid Valley Megamall", address: "Lot S-233, 2nd Floor, Mid Valley City, 59200 Kuala Lumpur", phone: "03-2283 8777", state: "Kuala Lumpur", image: "https://i.kym-cdn.com/photos/images/newsfeed/002/606/605/843.png" },
  { id: 4, name: "Publika Mont Kiara", address: "Lot 23A, Level G3, Publika Mall, 50480 Kuala Lumpur", phone: "03-6211 8888", state: "Kuala Lumpur", image: "https://via.placeholder.com/300" },
  { id: 5, name: "Gurney Plaza", address: "170, 2nd Floor, Plaza Gurney, 10250 Georgetown, Penang", phone: "04-229 9988", state: "Penang", image: "https://via.placeholder.com/300" },
  { id: 6, name: "Sunway Pyramid", address: "Lot F1.27, 1st Floor, Sunway Pyramid, 46150 Petaling Jaya", phone: "03-7491 9988", state: "Selangor", image: "https://via.placeholder.com/300" },
];

const Contact: React.FC = () => {
  const [selectedState, setSelectedState] = useState<string>("All");

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(event.target.value);
  };

  const filteredBranches = selectedState === "All" ? branches : branches.filter(branch => branch.state === selectedState);

  return (
    <div className="container mt-5">
      {/* Header Image */}
      <div className="text-center">
        <img src={timelessstyle2} height="400" alt="Branch Header" className="me-4" />
      </div>


      {/* Branch Title & Filter */}
      <h2 className="text-center mb-4">Branch</h2>
      <div className="text-center mb-4">
        <label className="me-2"><strong>State:</strong></label>
        <select className="form-select d-inline w-auto" value={selectedState} onChange={handleFilterChange}>
          <option value="All">All</option>
          <option value="Kuala Lumpur">Kuala Lumpur</option>
          <option value="Selangor">Selangor</option>
          <option value="Penang">Penang</option>
        </select>
      </div>

      {/* Branch Grid Layout */} 
      <div className="row">
        {filteredBranches.map((branch) => (
          <div key={branch.id} className="col-md-4 mb-4">
            <div className="card shadow">
              <img src={branch.image} alt={branch.name} className="card-img-top" /> {/* replace img src with branch.name later for specific images */} 
              <div className="card-body">
                <h5 className="card-title">{branch.name}</h5>
                <p className="card-text">{branch.address}</p>
                <p className="card-text"><strong>{branch.phone}</strong></p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Contact;
