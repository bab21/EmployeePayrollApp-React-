import React, {Component} from 'react'
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import './home.scss';
import logo from '../../assets/images/logo.png';

import deleteIcon from '../../assets/icons/delete-black-18dp.svg';
import updateIcon from '../../assets/icons/create-black-18dp.svg'
import {useParams,Link,withRouter} from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService'

class Home extends Component{
    constructor(props) {
        super(props)

        this.state = {
                employees: []
        }

        

        this.deleteEmployee = this.deleteEmployee.bind(this);
        this.updateEmployee = this.updateEmployee.bind(this);
    }

    componentWillMount(){
        console.log("vcalling");

        EmployeeService.getEmployees().then((res) => {
            console.log(res);
            console.log("message : "+res.message);
            console.log(res.data.data);
            this.setState({ employees: res.data.data});
        })
        .catch(err => console.log(err));
        console.log("all" +this.state.employees);
    }
    

    deleteEmployee(id){
        EmployeeService.deleteEmployee(id).then( res => {
            this.setState({employees: this.state.employees.filter(employee => employee.id !== id)});
        });
    }
    updateEmployee(id){
        this.props.history.push(`/add-employee/${id}`);
    }

    // getDeptHtml(deptList){
    //     let deptHtml ='';
    //     for(const dept of deptList){
    //         deptHtml =`${deptHtml}<div class='dept-label>${dept}</div>`;
    //     }
    //     return deptHtml;
    // }
    
    render(){
        return(
            <div>
                <header class="header-content header">
                    <div class="logo-content">
                        <img src={logo} alt=""/>
                        <div>
                            <span class="emp-text">EMPLOYEE</span><br></br>
                            <span class="emp-text emp-payroll">PAYROLL</span>
                        </div>
                    </div>
                </header> 
                <div class="main-content">
                    <div class="header-content">
                        <div class="emp-detail-text">
                            Employee Details <div class="emp-count">10</div>
                        </div>
                        <Link to="/add-employee/_add" class="add-button">
                        <img src="../../assets/icons/add-24px.svg" alt=""/>Add User</Link>
                    </div>
                    <table id="table-display" class="table">
                        <th></th><th>Name</th><th>Gender</th><th>Department</th><th>Salary</th><th>Start Date</th><th>Actions</th>
                        {
                            this.state.employees.map(
                                (employee,id) =>(
                                <tr>
                                    <td><img class ="profile" src={
                                        employee.profilePic==="../../assets/profile-images/Ellipse -8.png"?
                                        profile3:
                                        employee.profilePic==="../../assets/profile-images/Ellipse -7.png"?
                                        profile4:
                                        employee.profilePic==="../../assets/profile-images/Ellipse -1.png"?
                                        profile2:profile1
                                        
                                    } alt="Image"/></td>
                                    <td>{employee.name}</td>
                                    <td>{employee.gender}</td>
                                    <td>{
                                       employee.departments.map(
                                           dept=>(<div class='dept-level'>{dept}</div>)
                                       )}</td>
                                    <td>{employee.salary}</td>
                                    <td>{employee.startDate}</td>
                                    <td>
                                        <img id={employee.employeeId} onClick={()=>this.deleteEmployee(employee.employeeId)} alt="delete" src={deleteIcon} />
                                        <img id={employee.employeeId} onClick={()=>this.updateEmployee(employee.employeeId)} alt="update" src={updateIcon} />
                                    </td>
                                </tr>
                                )
                            )
                        }
                    </table>
                </div>
            </div>
            
        )
    }
}

export default withRouter(Home)