import React, { useState, useEffect } from 'react';
import { FiPieChart } from 'react-fi-icons';
import { useNavigate, useParams } from "react-router-dom";
const InsuranceDetailsPage = () => {
  const [insuranceDetails, setInsuranceDetails] = useState(null);

  // Fetch insurance details using the insurance_uuid
  useEffect(() => {
    const { id } = useParams();
    const fetchInsuranceDetails = async () => {
      try {
        const response = await fetch(`http://localhost:3000/insurance/${id}`);
        const data = await response.json();
        setInsuranceDetails(data);
      } catch (error) {
        console.error('Error fetching insurance details:', error);
      }
    };

    fetchInsuranceDetails();
  }, []);

  const renderInsuranceDetails = () => {
    if (!insuranceDetails) {
      return <p style={styles.loading}>Loading...</p>;
    }

    const remainingClaims = 100 - (insuranceDetails.sum_assured / 1000000) * 100;

    return (
      <div style={styles.container}>
        <h1 style={styles.heading}>Insurance Details</h1>
        <p style={styles.details}>User Name: Selvan</p>
        {/* Add more details here */}
        
        {/* Pie Chart Section (using react-fi-charts) */}
        <div style={styles.chartContainer}>
          <h2 style={styles.chartHeading}>Sum Assured Distribution</h2>
          <div style={styles.chart}>
            <FiPieChart
              data={[insuranceDetails.sum_assured, 1000000 - insuranceDetails.sum_assured]}
              colors={['#36A2EB', '#FF6384']}
              size={150}
            />
          </div>
        </div>

        {/* Remaining Claims Section */}
        <div style={styles.remainingClaimsContainer}>
          <h2 style={styles.remainingClaimsHeading}>Remaining Claims</h2>
          <p style={styles.remainingClaimsDetails}>Remaining Claims Percentage: 100%</p>
          <img
            src="https://static.vecteezy.com/system/resources/previews/019/923/453/original/100-percent-pie-chart-circle-diagram-business-illustration-percentage-infographics-vector.jpg" // Replace with the actual path to your image
            alt="Remaining Claims Image"
            style={styles.remainingClaimsImage}
            height={50}
          />
        </div>
        <h4>History Of Claims</h4>
        <h5>None until now.</h5>
      </div>
    );
  };

  return <div>{renderInsuranceDetails()}</div>;
};

const styles = {
  container: {
    maxWidth: '800px',
    margin: '0 auto',
    textAlign: 'center',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  loading: {
    fontSize: '18px',
    fontWeight: 'bold',
  },
  heading: {
    fontSize: '24px',
    fontWeight: 'bold',
    marginBottom: '20px',
  },
  details: {
    fontSize: '16px',
    marginBottom: '10px',
  },
  chartContainer: {
    maxWidth: '400px',
    margin: '40px auto',
  },
  chartHeading: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  chart: {
    display: 'flex',
    justifyContent: 'center',
  },
  remainingClaimsContainer: {
    marginTop: '40px',
  },
  remainingClaimsHeading: {
    fontSize: '18px',
    fontWeight: 'bold',
    marginBottom: '10px',
  },
  remainingClaimsDetails: {
    fontSize: '16px',
    marginBottom: '20px',
  },
  remainingClaimsImage: {
    maxWidth: '100%',
    height: 'auto',
  },
};

export default InsuranceDetailsPage;
