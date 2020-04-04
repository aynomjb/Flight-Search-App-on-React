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

	//Do base search
	let searchedFlights = allFlights
	.filter(flight => flight['From'].toLowerCase() == query.source.toLowerCase() && flight['To'].toLowerCase() == query.desti.toLowerCase() && flight['Seats Available'] >= query.no);

	//Do Sort
	searchedFlights = doSortBy(searchedFlights, query.sort.type, query.sort.val);
	return searchedFlights;
}

const doSortBy = (flights, type, val) => {
	return flights.sort((a,b) => {
		if(type == 'Price' || type == 'Seats Available') {
			if(val == 'low') return a[type] - b[type];
			else return b[type] - a[type];
		}
		else if(type == 'Airline') {
			if(val == 'low') {
				return a[type] - b[type];
			}
			else {
				if(a[type] > b[type]) return -1;
				if(a[type] < b[type]) return 1;
				return 0;
			}
		}
		else if(type == 'Duration') {
			if(val == 'low') return parseDuration(a[type]) - parseDuration(b[type]);
			else return parseDuration(b[type]) - parseDuration(a[type]);
		}
		else if(type == 'Departure' || 'Arrival') {
			if(val == 'low') return new Date(Date.parse(`2020/04/04 ${a[type]}`)) - new Date(Date.parse(`2020/04/04 ${b[type]}`));
			else return new Date(Date.parse(`2020/04/04 ${b[type]}`)) - new Date(Date.parse(`2020/04/04 ${a[type]}`));
		}
	})
}

const parseDuration = (duration) => {
	duration = duration.toLowerCase()
	if(duration.includes('hours')&&duration.includes('mins')) {
		let splited = duration.split('hours');
		return (splited[0].trim()* 60) + (splited[1].split('mins')[0].trim()/1);
	}
	else if(duration.includes('hours')) {
		return duration.split('hours')[0].trim()*60;
	}
	else if(duration.includes('mins')) {
		return duration.split('mins')[0].trim();
	}
	return 0;
}



export default flightReducer;