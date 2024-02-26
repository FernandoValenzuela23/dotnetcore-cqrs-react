import React, { Component } from 'react';
import { Container } from 'reactstrap';
import SessionManager from './Auth/SessionManager';

export class Layout extends Component {

  render() {
    return (

      SessionManager.getToken() ? (
        <div >          
          <Container >
            {this.props.children}
          </Container>
        </div>

      ) :
        (
          <div className='main-container'>
            <Container >
              {this.props.children}
            </Container>
          </div>
        )

    );
  }
}