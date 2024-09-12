
import axios from "axios";
import { ic } from 'azle';
import { DistanceMatrixResponse, CarbonPricingResponse, VehicleEmissionsResponse, ElectricityMapResponse }from "../types";

async function getDistanceMatrix(origin: string, destination: string): Promise<DistanceMatrixResponse> {
    const apiKey =  process.env.GOOGLE_MAPS_API_KEY;
    const url = `https://maps.googleapis.com/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
    
    const response = await axios.get(url);
    return response.data;
  }
  
  async function getElectricityData(): Promise<ElectricityMapResponse> {
    const apiKey = process.env.ELECTRICITY_MAP_API_KEY;
    const url = 'https://api.electricitymap.org/v3/carbon-intensity/latest?zone=ZA';
    
    const response = await axios.get(url, {
      headers: { 'auth-token': apiKey }
    });
    return response.data;
  }
  
  async function getVehicleEmissions(vehicleType: string): Promise<VehicleEmissionsResponse> {
    const apiKey = process.env.UK_VEHICLE_EMISSIONS_API_KEY;
    const url = `https://vehicleenquiry.service.gov.uk/vehicle-data/v1/fuel-consumption?type=${encodeURIComponent(vehicleType)}`;
    
    const response = await axios.get(url, {
      headers: { 'x-api-key': apiKey }
    });
    return response.data;
  }
  
  async function getCarbonPricing(): Promise<CarbonPricingResponse> {
    // Note: The EU ETS doesn't have a public API. This is a placeholder.
    // In a real scenario, you might need to scrape data or use a paid service.
    const url = 'https://example-carbon-pricing-api.com/latest';
    
    const response = await axios.get(url);
    return response.data;
  }

  async function sendToBaseSepoliaContract(carbonFootprint: bigint): Promise<void> {
    // This function will be implemented in a separate file
    console.log(`Sending carbon footprint of ${carbonFootprint} to Base Sepolia contract`);
  }
  
  export {
    getCarbonPricing, 
    getDistanceMatrix, 
    getVehicleEmissions, 
    getElectricityData, 
    sendToBaseSepoliaContract
  }