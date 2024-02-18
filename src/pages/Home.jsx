import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FiLogOut } from "react-icons/fi";

function ColContents(props) {
  const navigator = useNavigate();

  const handleViewMore = () => {
    navigator(`/${props.id}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-4 md:flex md:justify-between">
      <div className="mb-4 md:mb-0 md:mr-4">

        <p className="text-gray-700">Patient ID: {props.patient_uuid}</p>
        <p className="text-gray-700">Amount: {props.sum_assured}</p>
        <p className="text-gray-700">Name of Policy: {props.name_of_policy}</p>
        <p className="text-gray-700">Number of Premiums: {props.number_of_premiums}</p>
        <p className="text-gray-700">Policy Number/Name: {props.insurance_policy_no}</p>
        <br></br>
        <button
          className="bg-blue-500 p-2 text-white rounded-md text-sm hover:bg-blue-500 focus:outline-none focus:ring focus:border-blue-300"
          onClick={handleViewMore}
        >
          View Full Record
        </button>
      </div>
    </div>
  );
}

function NavBar() {
  return (
    <nav className="bg-gray-500 p-4 flex flex-col md:flex-row items-center justify-between">
      <div className="flex items-center mb-4 md:mb-0">
        <a href="/">
          <h1 className="text-white text-lg font-bold">UHS</h1>
        </a>
      </div>
      <div className="flex items-center mb-4 md:mb-0">
        <h2 className="text-white text-lg font-bold mb-4 md:mb-0">Viewing Records</h2>
      </div>
      <div className="flex items-center">
        <a href="/" className="text-white hover:text-gray-300 ml-4 hidden md:block">
          Logout
          <FiLogOut className="ml-2" size={20} />
        </a>
      </div>
    </nav>
  );
}

function Home() {
  const { id } = useParams();
  const [details, setDetails] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:3000/insurance/${id}`);
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  return (
    <div>
      <NavBar />
      <div className="">
        {details.map((item) => (
          <ColContents key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}

export default Home;
