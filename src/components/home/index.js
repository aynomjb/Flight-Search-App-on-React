import React, {Component} from 'react';
import history from "../../history";
import 'bootstrap/dist/css/bootstrap.min.css';
import {Form, Button, Container, Row, Col, Card} from 'react-bootstrap'
class Home extends Component {
    constructor(props) {
        super(props);
        this.state = {
            source:'',
            destination:'',
            noOfSeats: 1,
            errors: {}
        }
    }

    handleInputChange(e) {
        let state = this.state;
        state[e.target.name] = e.target.value;
        state.errors[e.target.name] = false;
        this.setState(state);
    }
    handleSubmit(e) {
        e.preventDefault();
        if(this.state.source&&this.state.destination&&this.state.noOfSeats) history.push(`flights?source=${this.state.source}&desti=${this.state.destination}&no=${this.state.noOfSeats}`);
        else {
            let state = this.state;
            state.errors.source = this.state.source == ''?true:false;
            state.errors.destination = this.state.destination == ''?true:false;
            this.setState(state);
        }
    }
    
    render() {
        return <React.Fragment>
            <Container>
                <Row>
                    <Col style={{padding: '10px'}}>
                        <h5>Flights Search</h5>
                     
                        <span style={{color: 'grey', fontSize: '11px'}}>BEST FLIGHT BOOKING EXPERIENCE</span>
                    </Col>
                </Row>
            </Container>
            <Container>
                <Row className="justify-content-md-center">
                    <Col md={10} style={{
                    }}>
                        <Card style={{border: 'none'}}>
                            <Card.Body>
                            <Form onSubmit={e=>this.handleSubmit(e)}>
                                <Row>
                                    <Col md={4} style={{paddingBottom: '5px'}}>
                                        <Card style={{background: '#eaf5ff', border: 'none', padding:'17px', borderRadius: '10px'}}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label style={{color:'#008cff'}}>FROM</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Source" value={this.state.source} name={"source"} onChange={e=>this.handleInputChange(e)} isInvalid={this.state.errors.source}/>
                                            </Form.Group>
                                        </Card>
                                        
                                    </Col>
                                    <Col md={4} style={{paddingBottom: '5px'}}>
                                        <Card style={{background: '#eaf5ff', border: 'none', padding:'17px', borderRadius: '10px'}}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label style={{color:'#008cff'}}>TO</Form.Label>
                                                <Form.Control type="text" placeholder="Enter Destinantion" value={this.state.destination} name={"destination"} onChange={e=>this.handleInputChange(e)} isInvalid={this.state.errors.destination}/>
                                            </Form.Group>
                                        </Card>
                                    </Col>
                                    <Col md={2} style={{paddingBottom: '5px'}}>
                                        <Card style={{background: '#eaf5ff', border: 'none', padding:'17px', borderRadius: '10px'}}>
                                            <Form.Group controlId="formBasicEmail">
                                                <Form.Label style={{color:'#008cff'}}>SEATS</Form.Label>
                                                <Form.Control type="number" value={this.state.noOfSeats} name={"noOfSeats"} onChange={e=>this.handleInputChange(e)}/>
                                                <Form.Text className="text-muted">
                                                </Form.Text>
                                            </Form.Group>
                                        </Card>
                                        
                                    </Col>
                                    <Col md={2} style={
                                        {
                                            'alignItems':'center',
                                            'display': 'flex'
                                        }
                                    }>
                                        <Button variant="primary" type="submit" block>
                                        Search Flights
                                        </Button> 
                                    </Col>
                                </Row>
                            </Form>
                            </Card.Body>
                        </Card>
                        
                    </Col>
                </Row>
            </Container>
            
        </React.Fragment>
    }
}

export default Home