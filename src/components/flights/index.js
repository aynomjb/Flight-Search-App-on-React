import React, {Component} from 'react';
import history from "../../history";
import { connect } from 'react-redux'
import {getFlights, requestFlightsSuccess} from '../../redux/flights/actions'
import queryString from 'query-string'
import {Form, Button, Container, Row, Col, Card, OverlayTrigger, Popover} from 'react-bootstrap'
import { IoMdArrowBack} from "react-icons/io";
import {MdTimer, MdFlightTakeoff, MdFlightLand, MdEventSeat, MdFlight} from "react-icons/md";
import { FaFilter, FaSort, FaRupeeSign} from "react-icons/fa";

const filterBy = [
    {
        name: 'Price',
        symbol: FaRupeeSign,
        type: 'slider'
    },
    {
        name: 'Duration',
        symbol: MdTimer,
        type: 'select'
    },
    {
        name: 'Airline',
        symbol: MdFlight,
        type: 'select'
    },
    {
        name: 'Departure',
        symbol: MdFlightTakeoff,
        type: 'select'
    },
    {
        name: 'Arrival',
        symbol: MdFlightLand,
        type: 'select'
    }
]

const sortBy = [
    {
        name: 'Price',
        symbol: FaRupeeSign,
        options: [
            {
                name: 'Cheapest First',
                order: 'low'
            },
            {
                name: 'Expensive First',
                order: 'high'
            }
        ]
    },
    {
        name: 'Duration',
        symbol: MdTimer,
        options: [
            {
                name: 'Shortest First',
                order: 'low',
            },
            {
                name: 'Longest First',
                order: 'high'
            }
        ]
    },
    {
        name: 'Departure',
        symbol: MdFlightTakeoff,
        options: [
            {
                name: 'Earlist First',
                order: 'low',
            },
            {
                name: 'Latest First',
                order: 'high'
            }
        ]
    },
    {
        name: 'Arrival',
        symbol: MdFlightLand,
        options: [
            {
                name: 'Earlist First',
                order: 'low',
            },
            {
                name: 'Latest First',
                order: 'high'
            }
        ]
    },
    {
        name: 'Seats Available',
        symbol: MdEventSeat,
        options: [
            {
                name: 'Low to High',
                order: 'low',
            },
            {
                name: 'High to Low',
                order: 'high'
            }
        ]
    },
    {
        name: 'Airline',
        symbol: MdFlight,
        options: [
            {
                name: 'A to Z',
                order: 'low',
            },
            {
                name: 'Z to A',
                order: 'high'
            }
        ]
    }
]

class Flights extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchBy: {
                desti: '',
                source: '',
                no: '',
            },
            showPopoverFilter: false,
            showPopoverSort: false,
            showFlights: true,
            appliedsort:{}
        }
    }

    componentDidMount() {
        window.scrollTo(0,0);
        this.setState({searchBy:{...queryString.parse(this.props.location.search),...{sort: {}}}}, () => this.props.getFlights(this.state.searchBy));
    }

    componentDidUpdate(preProps) {
      
    }

    toggleFlightList() {
        this.setState({showFlights: this.state.showPopoverFilter || this.state.showPopoverSort? false:true}, () => {
            let state = this.state;
            state.searchBy.sort = this.state.appliedsort;
            this.setState(state,()=>console.log(this.state))
        })

    }

    handleCustomSort(type, val) {
        let state = this.state;
        state.searchBy.sort = { type, val};
        this.setState(state,()=>console.log(this.state))
    }

    applySort() {
        this.setState({showPopoverFilter: false, showPopoverSort: false, appliedsort: this.state.searchBy.sort}, () => this.toggleFlightList());
        this.props.getFlights(this.state.searchBy);
    }

    applyFilter() {
        this.setState({showPopoverFilter: false, showPopoverSort: false}, () => this.toggleFlightList());
    }

    render() {
        const {myFlights} = this.props; 
        return (
            <React.Fragment>
                <Container style={{position: 'fixed', zIndex: 999}}>
                    <Row style={{
                        background:'white',
                        width: '100vw',
                        boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)',
                        paddingTop: '10px',
                        paddingBottom: '10px'
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
                                <div>
                                    {this.state.searchBy.source.toUpperCase()} - {this.state.searchBy.desti.toUpperCase()}
                                </div>
                                <div className={'text-muted'} style={{fontSize: '13px'}}>
                                    {this.state.searchBy.no} Traveller
                                </div>
                            </div>
                        </Col>
                        <Col xs={1} style={{alignItems:'center',display:'flex'}}>
                            <span style={{cursor: 'pointer'}} onClick={() => {
                                this.setState({showPopoverSort: !this.state.showPopoverSort, showPopoverFilter: false}, () => this.toggleFlightList());
                            }}>
                                <FaSort/>
                            </span>
                        </Col>
                        <Col xs={2} style={{alignItems:'center',display:'flex'}}>
                            <span style={{cursor: 'pointer'}} onClick={() => {
                                this.setState({showPopoverSort: false, showPopoverFilter: !this.state.showPopoverFilter}, () => this.toggleFlightList());
                            }}>
                                <FaFilter/>
                            </span>
                        </Col>
                    </Row>
                    {
                        this.state.showPopoverSort &&
                        <Row style={{
                            background:'white',
                            width: '100vw'
                        }}>
                            <Col xs={12} style={{boxShadow: '0 8px 6px -6px rgba(0, 0, 0, 0.2)', paddingLeft: '65px'}}>
                               <h5>Sort by</h5>
                            </Col>
                            <Col style={{height: '60vh', overflowY: 'scroll'}}>
                                {
                                    sortBy.map((sort, s) => {
                                    return <React.Fragment key={s}>
                                        <Col xs={12} style={{borderBottom: '1px solid grey', padding: '10px', paddingTop: '20px'}}>
                                                <Row>
                                                    <Col xs={7} style={{paddingLeft: '30px'}}
                                                    className={`${
                                                        sort['name'] == this.state.searchBy.sort.type?'text-primary':''
                                                    }`}
                                                    >
                                                        {
                                                            React.createElement(sort['symbol'])
                                                        }
                                                        &nbsp;{sort['name']}
                                                    </Col>
                                                    <Col xs={5}>
                                                        <Row>
                                                            {
                                                                sort.options.map((order, o) => {
                                                                    return <React.Fragment key={o}>
                                                                        <Col xs={12} style={{ fontSize: '13px', paddingBottom: '10px',paddingRight:'30px', textAlign:'right'}} 
                                                                        onClick={
                                                                            () => {
                                                                                this.handleCustomSort(sort['name'],order['order'])
                                                                            }
                                                                        }
                                                                        className={`${
                                                                            sort['name'] == this.state.searchBy.sort.type && order['order'] == this.state.searchBy.sort.val?'text-primary':'text-muted'
                                                                        }`}
                                                                        >
                                                                        <span style={{cursor: "pointer"}}>{order['name']}</span>
                                                                        </Col>
                                                                    </React.Fragment>
                                                                })
                                                            }
                                                        </Row>
                                                    </Col>
                                                </Row>
                                            </Col>
                                    </React.Fragment>
                                    })
                                }
                            </Col>
                            
                            <Col xs={12} style={{paddingTop:'20px', paddingBottom: '20px'}}>
                                <Button variant="primary" onClick={() => {
                                    this.applySort();
                                }} block>
                                    APPLY
                                </Button> 
                            </Col>
                             
                        </Row>
                    }
                    {
                        this.state.showPopoverFilter &&
                        <Row style={{
                            background:'white',
                            width: '100vw'
                        }}>
                            <Col xs={12} style={{boxShadow: '0 8px 6px -6px rgba(0, 0, 0, 0.2)', paddingLeft: '65px'}}>
                                <h5>Filter by</h5>
                            </Col>
                            <Col style={{height: '60vh', overflowY: 'scroll'}}>
                                under construction
                            </Col>
                            <Col xs={12} style={{paddingTop:'20px', paddingBottom: '20px'}}>
                                <Button variant="primary" onClick={() => {
                                    this.applyFilter();
                                }} block>
                                    APPLY
                                </Button> 
                            </Col>
                        </Row>
                    }
                </Container>
                {
                    this.state.showFlights &&
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
                                                    <p style={{fontSize: '11px'}} className={'text-muted'}>{flight['From']}</p>
                                                    </Col>
                                                    <Col xs={3} style={{alignItems:'center',display:'flex', fontSize:'11px'}}><p>{flight['Duration']}</p></Col>
                                                    <Col xs={3}><h6 style={{fontSize: '13px'}}>{flight['Arrival']}</h6>
                                                    <p style={{fontSize: '11px'}} className={'text-muted'}>{flight['To']}</p>
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
                }
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
