import React, {Component} from 'react'

class CreateClass extends Component {
  constructor(props){
    super(props);
    this.state = {
       className : '',
	     schoolYear : '',
      }
  }

  handleCreate = async (e) => {
        var url = 'http://localhost:8095/dnevnik/class/addnew?className=' + this.state.className + 
        '&schoolYear=' + this.state.schoolYear;
        console.log(url);
        const response = await fetch(url, {
          method: 'POST',
          headers: {
                'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                "Content-type": "application/json; charset=UTF-8",
                'Accept': 'application/json'
            },
          body: JSON.stringify({
            className: this.state.className,
            schoolYear: this.state.schoolYear,
          })
        })
        if(response.ok) {
            const serverResponse = await response.json();
            console.log(serverResponse);
            alert('Just created new class');
        } else {            
            console.log("Greska prilikom odgovora");
            alert('Please check again in sql and back')
        }
        console.log(response);
    }
    
	
	classNameHandler = (event) => {
		this.setState({className: event.target.value});
	}
	
	schoolYearHandler = (event) => {
		this.setState({schoolYear: event.target.value});
	}

  render() {
	console.log("EditClass props");
	console.log(this.props);
    return (
        <div className="aaaa ct">
        <label htmlFor="className">Add class name</label>
        <input 
          type="text"
          value={this.state.className}
          onChange={this.classNameHandler}
          required />
          <br />
        <label htmlFor="schoolYear">Add school year</label>
        <input 
          type="text"
          value={this.state.schoolYear}
          onChange={this.schoolYearHandler}
          required />
          <br />
        <button
          value="Save new class"
			    onClick={() => this.handleCreate()}
        >Save new class!
        </button>  
        <br />  
        </div>
        )
        }
}
export default CreateClass;