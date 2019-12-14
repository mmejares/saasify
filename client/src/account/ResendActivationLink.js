import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import './account.scss';

class ResendActivationLink extends Component {
	state = {
		email: ''
	}

	handleEmailChange = (event) => {
		this.setState({
			email: event.target.value
		})
	}

	handleSubmitClick = () => {
		// Submit the email and password to the server
		const url = '/api/resend-activation-link';
		
		fetch(url, {
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			},
			credentials: 'same-origin',
			method: 'POST',
			body: JSON.stringify({
				email: this.state.email
			})
		}).then((response) => {
			if (!response.ok) {
				return response.json().then(err => { throw err })
			}
			return response.json();
		}).then((results) => {
			console.log('results ', results);
			
		}).catch((error) => {
			console.log('error ', error);
		})
	}

	render() {
		return (
			<div className="container">
				<div className="form-container">
					<h2>Resend Activation Link</h2>
					<div>
						<Form>
						  <Form.Group controlId="formBasicEmail">
						    <Form.Label>Email address</Form.Label>
						    <Form.Control
						    	type="email"
					    		placeholder="Enter email"
					    		onChange={this.handleEmailChange}
					    		value={this.state.email}
					    	/>
						    <Form.Text className="text-muted">
						      This account should already exist in our database.
						    </Form.Text>
						  </Form.Group>

						  <Button
						  	variant="primary"
						  	type="button"
						  	onClick={this.handleSubmitClick}
						  >
						    Submit
						  </Button>

						</Form>
					</div>
					<div className="actions-container">
						<div>
							<div>Already have an account?</div>
							<div><Link to="/login">Login</Link></div>
						</div>
						<div>
							<div>Don't have an account?</div>
							<div><Link to="/register">Register</Link></div>
						</div>
						
					</div>
				</div>
			</div>
		);
	}
}

export default ResendActivationLink;