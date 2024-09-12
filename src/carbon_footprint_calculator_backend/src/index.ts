;
import { Canister, query, update, text, nat64, Vec, Result, ic } from 'azle';
import { DistanceMatrixResponse, CarbonPricingResponse, VehicleEmissionsResponse, ElectricityMapResponse } from './types';
import axios from 'axios';
import {   getCarbonPricing, 
    getDistanceMatrix, 
    getVehicleEmissions, 
    getElectricityData, 
sendToBaseSepoliaContract } from './controllers';

export default Canister({
    getCarbonFootprint: query([], text, () => {
      return "Latest carbon footprint: X kgCO2e";
    }),
  
    calculateCarbonFootprint: update([text, text, text], Result(nat64, text), async (origin, destination, vehicleType) => {
      try {
        const distanceData = await getDistanceMatrix(origin, destination);
        const electricityData = await getElectricityData();
        const emissionsData = await getVehicleEmissions(vehicleType);
        const carbonPricing = await getCarbonPricing();
  
        const distanceKm = distanceData.rows[0].elements[0].distance.value / 1000;
        const carbonFootprint = distanceKm * emissionsData.data[0].co2;
  
        const result = BigInt(Math.round(carbonFootprint));
        
        await sendToBaseSepoliaContract(result);
        
        return Result.Ok(result);
      } catch (error) {
        return Result.Err(`Error calculating carbon footprint: `);
      }
    })
  });