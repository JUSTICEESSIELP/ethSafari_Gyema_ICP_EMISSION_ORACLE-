
interface DistanceMatrixResponse {
    rows: Array<{
      elements: Array<{
        distance: { value: number };
        duration: { value: number };
      }>;
    }>;
  }
  
  interface ElectricityMapResponse {
    data: {
      carbonIntensity: number;
    };
  }
  
  interface VehicleEmissionsResponse {
    data: Array<{
      fuel: string;
      description: string;
      co2: number;
    }>;
  }
  
  interface CarbonPricingResponse {
    data: {
      carbonPrice: number;
    };
  }

  export {
    CarbonPricingResponse, 
    VehicleEmissionsResponse, 
    ElectricityMapResponse, 
    DistanceMatrixResponse,
  }