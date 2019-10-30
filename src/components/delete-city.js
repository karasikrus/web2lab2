import React from 'react';
class DeleteCity extends React.Component{

    deleteCity = () =>{
        console.log("udolyayem gorod ", this.props.city);
        this.props.removeCity(this.props.city);
    }

    render() {
        return(
          <div>
              <button onClick={this.deleteCity}>X</button>
          </div>
        );
    }

}
export default DeleteCity
