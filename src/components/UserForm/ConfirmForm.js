import React, { Component } from 'react';
import style from './FormsStyles.module.css';



export class ConfirmForm extends Component {
continue = event => {
    event.preventDefault();
    //send to database
    this.props.nextStep();
}

back = event => {
    event.preventDefault();
    this.props.prevStep();
}

    render() {


        const { values: { brideName, groomName, eventDate, email, tel, hallName, hallAdress, hallTown, temp, invitText, posAnswer, negAnswer, question, numberOfGuests } } = this.props;

        return (
            
            <div>
                  <div>
                    { brideName }
                  </div>

                  <div>
                    { groomName }
                  </div>

                  <div>
                    { eventDate }
                  </div>
                
                  <div>
                    { email }
                  </div>

                  <div>
                    { tel }
                  </div>

                  <div>
                    { hallName }
                  </div>

                  <div>
                    { hallAdress }
                  </div>

                  <div>
                    { hallTown }
                  </div>

                  <div>
                    { temp }
                  </div>

                  <div>
                    { invitText }
                  </div>

                  <div>
                    { posAnswer }
                  </div>

                  <div>
                    { negAnswer }
                  </div>

                  <div>
                    { question }
                  </div>
                  
                  <div>
                    { numberOfGuests }
                  </div>
             
              <button
                      className={style.submitButton}
                      label="back"
                      primary={true}
                      style={style.button}
                      onClick={this.back}
                      >
                          back
              </button>
              <button
                  className={style.submitButton}
                  label="continue"
                  primary={true}
                  style={style.button}
                  onClick={this.continue}
                  >
                      confirmer
              </button>
          </div> 
      
            
        )
    }
}


export default ConfirmForm
