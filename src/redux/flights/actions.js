import { 
	REQUEST_FLIGHTS,
	REQUEST_FLIGHTS_SUCCESS,
	REQUEST_FLIGHTS_FAILURE
 } from './types';


export const requestFlights = (query) => {
	return {
		type: REQUEST_FLIGHTS,
		payload: query
	}
}

export const requestFlightsSuccess = () => {
	return {
		type: REQUEST_FLIGHTS_SUCCESS,
	}
}

export const requestFlightsFailure = (error) => {
	return {
		type: REQUEST_FLIGHTS_FAILURE,
		payload: error
	}
}

export const getFlights = (query) => dispatch => {
	if(!query) {
		dispatch(requestFlightsFailure("Invalid Query"))
		return false;
	}
	else if(!('source' in query)||!('desti' in query)||!('no' in query)) {
		dispatch(requestFlightsFailure("Invalid Query"))
		return false;
	}
	dispatch(requestFlights(query));
}

