import React, {Component} from 'react';
import history from "../../history";
import { connect } from 'react-redux'
import {getFlights, requestFlightsSuccess} from '../../redux/flights/actions'
import queryString from 'query-string'
import {Form, Button, Container, Row, Col, Card, OverlayTrigger, Popover} from 'react-bootstrap'
import { IoMdArrowBack} from "react-icons/io";
import { FaFilter, FaSort} from "react-icons/fa";
class Flights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBy: {
                desti: '',
                source: '',
                no: ''
            },
            filter: {
                'Price': {
                    type: 'slider'
                },
                'Duration': {
                    type: 'select'
                },
                'Airline': {
                    type: 'multiselect'
                },
                'Departure': {
                    type: 'multiselect'
                },
                'Arrival': {
                    type: 'multiselect'
                }
            },
            sort: {
                'Price': ['low','high'],
                'Duration': ['low','high'],
                'Arrival': ['low','high'],
                'Departure': ['low','high'],
                'Seats Available': ['low','high'],
                'Airline':['asc', 'desc']
            }
        }
    }

    componentDidMount() {
        this.setState({searchBy:queryString.parse(this.props.location.search)}, () => this.props.getFlights(this.state.searchBy));
    }

    componentDidUpdate(preProps) {
      
    }

    render() {
        const {myFlights} = this.props; 
        return (
            <React.Fragment>
                <Container style={{position: 'fixed', zIndex: 999}}>
                    <Row style={{
                        background:'white',
                        width: '100vw'
                    }}>
                        <Col xs={2} style={{alignItems:'center',display:'flex', fontSize: '30px'}}>
                            <span onClick={()=>{
                                history.goBack()
                            }} style={{cursor: 'pointer'}}>
                                <IoMdArrowBack/>
                                </span>
                        </Col>
                        <Col xs={7} style={{padding:"10px", alignItems:'center',display:'flex'}}>
                            <div>
                            <h6>
                                {this.state.searchBy.source.toUpperCase()} - {this.state.searchBy.desti.toUpperCase()}
                            </h6>
                            <p>
                                {this.state.searchBy.no} Traveller
                            </p>
                            </div>
                        </Col>
                        <Col xs={1} style={{alignItems:'center',display:'flex'}}>
                            <span style={{cursor: 'pointer'}}>
                                <FaSort/>
                            </span>
                        </Col>
                        <Col xs={2} style={{alignItems:'center',display:'flex'}}>
                            <span style={{cursor: 'pointer'}}>
                                <FaFilter/>
                            </span>
                        </Col>
                    </Row>
                </Container>
                <Container style={{background: '#e0e0e0', paddingTop: '15vh', minHeight: '100vh', paddingBottom: '10vh'}}>
                {
                    myFlights.map((flight, f) => {
                        return (
                            <React.Fragment key={f} >
                                <Row style={{padding: "5px"}}>
                                    <Col>
                                        <Card>
                                            <Row style={{padding: "10px"}}>
                                                <Col md={12}><h6>{flight['Airline']} | <span style={{fontSize: '13px', fontWeight: 'normal'}}>{flight['Seats Available']} seats available</span> </h6></Col>
                                                <Col xs={3}><h6 style={{fontSize: '13px'}}>{flight['Departure']}</h6>
                                                <p style={{fontSize: '11px'}}>{flight['From']}</p>
                                                </Col>
                                                <Col xs={3} style={{alignItems:'center',display:'flex', fontSize:'12px'}}><p>{flight['Duration']}</p></Col>
                                                <Col xs={3}><h6 style={{fontSize: '13px'}}>{flight['Arrival']}</h6>
                                                <p style={{fontSize: '11px'}}>{flight['To']}</p>
                                                </Col>
                                                <Col xs={3} style={{alignItems:'center',display:'flex'}}><h6>&#8377; {flight['Price']}</h6></Col>
                                            </Row>
                                        </Card>
                                    </Col>
                                </Row>
                                
                            </React.Fragment>
                        )
                    })
                }
                </Container>
                
            </React.Fragment>
        )
    }
}
export default connect(
    state => {
        return {
            myFlights: state.myFlights,
            loading: state.loading,
            error: state.error
        }
    },
    dispatch => {
        return {
            getFlights: (query) => dispatch(getFlights(query)),
            setRequestSuccess: () => dispatch(requestFlightsSuccess())
        }
    }
)(Flights)
