import dotenv from 'dotenv';
dotenv.config();

const { APP_ID, APP_KEY } = process.env;
import axios from 'axios';

import sendMessage from '../../producer';
import { environment } from '../../const';

const baseUrl = `https://api.flightstats.com/flex`;

interface GetArrivingFlights {
  success: boolean
  response: object
}

interface GetAriport {
  airportCode: string
  maxPositions: number
  maxFlights: number
}

const getArilineByCarrierCode = async (carrierCode: string) => {
  const result = await axios.get(`${baseUrl}/airlines/rest/v1/json/active?appId=${APP_ID}&appKey=${APP_KEY}`);
  const { name } =  result.data.airlines.find(z => z.fs === carrierCode);
  return name;
};

const getAirportByIataCode = async (iataCode: string) => {
  const result= await axios.get(`${baseUrl}/airports/rest/v1/json/iata/${iataCode}?appId=${APP_ID}&appKey=${APP_KEY}`);
  const { city, name } = result.data.airports[0];
  return `${iataCode} - ${city}  - ${name}`;
};

const getAirport = async (params: GetAriport) => {
  const {
    airportCode = 'VCE',
    maxPositions = 5,
    maxFlights = 20,
  } = params;
  const querystring = `appId=${APP_ID}&appKey=${APP_KEY}&includeFlightPlan=false&maxPositions=${maxPositions}&maxFlights=${maxFlights}`;
  const url = `${baseUrl}/flightstatus/rest/v2/json/airport/tracks/${airportCode}/dep?${querystring}`;
  const response = await axios.get(url);
  return response.data.flightTracks;
}

export async function getArrivingFlights(params: any) {
  try {
    let flightTracks = await getAirport(params);
    flightTracks = await Promise.all(flightTracks.map(async (flight: any) => {
      const {
        carrierFsCode,
        arrivalAirportFsCode: iataCode,
        departureDate,
        flightNumber
      } = flight;
      const [ airlines, airport ] = await Promise.all([
        getArilineByCarrierCode(carrierFsCode),
        getAirportByIataCode(iataCode)
      ]);
      return {
        airport,
        airlines,
        departure: departureDate.dateLocal,
        flightNumber: `${carrierFsCode} ${flightNumber}`
      }
    }));
    return {
      success: true,
      response: flightTracks
    }
  } catch (error) {
    console.error(error);
    return {
      success: false,
      response: {}
    }
  }
}

function sendData(x: GetArrivingFlights) {
  sendMessage(environment.TOPIC, JSON.stringify(x.response));
}
getArrivingFlights({
  airportCode: 'LAX'
}).then(sendData);