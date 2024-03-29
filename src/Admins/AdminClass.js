import React , {Component} from 'react';
import {BrowserRouter, Switch} from 'react-router-dom'
import CreateClass from '../Admins/Class/CreateClass'
import EditClass from '../Admins/Class/EditClass'

class AdminClass extends Component {
    constructor(props){
        super(props);
        this.state={
				selectedClass: null,
				isEditing:false,
				isCreating:false,
                isLoading:false,
                isError:false,
                aclass: []
        };
        this.handleCreate = this.handleCreate.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
    }
    
	handleCreate = () => {
		this.setState({isCreating: true,
			isEditing: false})
	}
    
	handleEdit = ( value ) => {
		console.log(value);
		this.setState({selectedClass: value,
			isCreating: false,
			isEditing: true})
	}
	
    async componentDidMount() {
            this.setState({ isLoading:true});
            const response= await fetch('http://localhost:8095/dnevnik/class', {
                method: 'GET',
                headers: {
                    'Authorization': 'Basic ' + window.btoa(this.props.username + ":" + this.props.password),
                    "Content-type": "application/json; charset=UTF-8",
                    'Accept': 'application/json'
                }
            });
        if(response.ok) {
            const aclass = await response.json();
            this.setState({aclass, isLoading: false})
        } else {
            this.setState ({ isLoading: false, isError: true });
        }
    }
    
    render() {
        const {aclass, isLoading, isError} = this.state;
        if(isLoading) {
            return <div>Loading...</div> 
        }
        if(isError){
            return <div>Error....or doesnt have any classes</div>
        }
    
		let creating;
		if (this.state.isCreating) {
            creating = <CreateClass
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role} />;
		}
	
		let editing;
		if (this.state.isEditing) {
            editing = <EditClass 
            userId={this.props.userId}
            username={this.props.username}
            password={this.props.password}
            role={this.props.role}
            selectedClass = {this.state.selectedClass} />;			
		}
	
        return aclass.length > 0
            ? (
                <div>
                    <BrowserRouter>
                    <p>To create new class, please click<br />
                    <button onClick={ value => this.handleCreate()}>Create</button></p>
                    <Switch />    
				    {creating}
				    {editing}
                    <Switch />
                    <h3>All school classes for 2019/2020</h3>
                    <table className="tablemark">
                      <thead>
                            <tr>{this.renderTableHeader()}</tr>
                      </thead>
                      <tbody>
                          {this.renderTableData()}
                      </tbody>
                    </table>
                    </BrowserRouter>
                </div>
            )
            : null
        }
    
renderTableData() {
        return this.state.aclass.map((aclas) => {
            return(
                <tr key={aclas.CLASS_ID} >
                    <td>{aclas.CLASS_ID}</td>
                    <td>{aclas.className}</td>
                    <td>{aclas.schoolYear}</td>
                    <td><button onClick={value => this.handleEdit(aclas)}>Edit</button></td>
                </tr>
            )
        })
    }
renderTableHeader() {
        const header = Object.keys(this.state.aclass[0]);
        return header.map((key, index) => {
            return <th key={index}>{key.toUpperCase()}</th>
        })
    }
}
export default AdminClass;