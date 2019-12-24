import React from 'react';
class AddCity extends React.Component{

    state = {
        city: undefined
    }

    addCity = (e) =>{
        e.preventDefault();
        this.props.addCity(e.target[0].value);
    }

    render() {
        return(
            <div>
                <form onSubmit={this.addCity}>
                    <input></input>
                    <button>add city</button>
                </form>
            </div>
        );
    }

}
export default AddCity
