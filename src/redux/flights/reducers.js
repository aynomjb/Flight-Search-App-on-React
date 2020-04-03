import { 
	REQUEST_FLIGHTS,
	REQUEST_FLIGHTS_SUCCESS,
	REQUEST_FLIGHTS_FAILURE
 } from './types';


const flightReducer = (state , action) => {
	switch(action.type) {
		case REQUEST_FLIGHTS: return {
			...state,
			loading:true,
			myFlights: fiterFlights(state.flights, action.payload)
		}
		case REQUEST_FLIGHTS_SUCCESS: return {
			...state,
			loading:false,
			error: ''
		}
		case REQUEST_FLIGHTS_FAILURE: return {
			...state,
			myFlights: [],
			loading:false,
			error: action.payload
		}
		default: return state
		
	}
}

const fiterFlights = (allFlights, query) => {
	return allFlights
	.filter(flight => flight['From'].toLowerCase() == query.source.toLowerCase() && flight['To'].toLowerCase() == query.desti.toLowerCase() && flight['Seats Available'] >= query.no);
}

export default flightReducer;