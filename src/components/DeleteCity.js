import React from 'react';
class DeleteCity extends React.Component{

    deleteCity = () =>{
        this.props.removeCity(this.props.city);
    };

    render() {
        return(
          <div className={'delete'}>
              <button className={'deleteButton'} onClick={this.deleteCity}>delete city</button>
          </div>
        );
    }

}
export default DeleteCity
