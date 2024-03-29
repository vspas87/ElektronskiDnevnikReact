import React, {Component} from 'react'

class EditClass extends Component {
  constructor(props){
	console.log("EditClass");
    super(props);	
    this.state = {
        className : props.selectedClass.className,
	      schoolYear : props.selectedClass.schoolYear,
	      CLASS_ID : props.selectedClass.CLASS_ID
	}
  }
  
  handleEdit = async (e) => {
        var url = 'http://localhost:8095/dnevnik/class/update/' + 
        this.state.CLASS_ID + '?className=' + 
        this.state.className + '&schoolYear=' + 
        this.state.schoolYear;
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
			CLASS_ID: this.state.CLASS_ID
          })
        })
        if(response.ok) {
            const serverResponse = await response.json();
            console.log(serverResponse);
            alert('Succesfully changed data. Please refresh!')
        } else {            
            console.log("Greska");
            alert('Please check limitation!')
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
        <label htmlFor="className">Change class name</label>
        <input 
          type="text"
          value={this.state.className}
          onChange={this.classNameHandler}
          required />
          <br />
        <label htmlFor="schoolYear">Change school year</label>
        <input 
          type="text"
          value={this.state.schoolYear}
          onChange={this.schoolYearHandler}
          required />
          <br />
        <button
        value="Save update"
			onClick={() => this.handleEdit()}
        >Save edited/changed data!
        </button>
        
      <br />  
      </div>
        )
        }
}
export default EditClass;