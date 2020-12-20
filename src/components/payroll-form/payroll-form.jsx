// import React, {userState,userEffect} from 'react';
import React, {Component} from 'react'
import profile1 from '../../assets/profile-images/Ellipse -3.png';
import profile2 from '../../assets/profile-images/Ellipse 1.png';
import profile3 from '../../assets/profile-images/Ellipse -8.png';
import profile4 from '../../assets/profile-images/Ellipse -7.png';
import './payroll-form.scss';
import logo from '../../assets/images/logo.png';
import {useParams,Link,withRouter} from 'react-router-dom';
import EmployeeService from '../../services/EmployeeService'

// const PayrollForm = (props) => {
//     let initialValue ={
//         name: '',
//         profileArray:[
//             {url: '../../../assets/profile-images/Ellipse -3.png'},
//             {url: '../../../assets/profile-images/Ellipse 1.png'},
//             {url: '../../../assets/profile-images/Ellipse -8.png'},
//             {url: '../../../assets/profile-images/Ellipse -7.png'}
//         ],
//         allDepartment:[
//             'HR','Sales','Finance','Engineer','Others'
//         ],
//         departmentValue: [],
//         gender: '',
//         salary: '',
//         day: '1',
//         month: 'Jan',
//         year: '2020',
//         startDate: '',
//         notes: '',
//         id: '',
//         profileUrl: '',
//         isUpdate: false,
//         error: {
//             department: '',
//             name: '',
//             gender: '',
//             salary: '',
//             profileUrl: '',
//             startDate: ''
//         }
//     }

//     const [formValue,setForm]= useState(initialValue);

//     const changeValue =(event) =>{
//         setForm({...formValue,[event.target.name]:event.target.value})
//     }

//     const onCheckChange =(name) =>{
//         let index = formValue.departmentValue.indexOf(name);
//         let checkArray =[...formValue.departmentValue]
//         if(index>-1)
//             checkArray.splice(index,1)
//         else 
//             checkArray.push(name);
//         setForm({...formValue,departmentValue: checkArray});
//     }

//     const getChecked =(name) =>{
//         return formValue.departmentValue && formValue.departmentValue.includes(name);
//     }

//     const validDate =async()=>{
//         let isError =false;
//         let error={
//             department: '',
//             name: '',
//             gender: '',
//             salary: '',
//             profileUrl: '',
//             startDate: ''
//         }
        
//         if(formValue.name.length<1){
//             error.name ='name is required field';
//             isError = true;
//         }

//         if(formValue.gender.length<1){
//             error.gender ='gender is required field'
//             isError =true;
//         }

//         if(formValue.salary.length<1){
//             error.gender ='salary is required field'
//             isError =true;
//         }
//     }

//     return(
//         <div className="payroll-main">
//             <Toolbar/>
//             <div className="content">
//                 <form className="form" action="#" onSubmit={save}>
//                     <div className="form-head">Employee Payroll form</div>
//                     <div className="row-content">
//                         <label className="label text" htmlFor="name">Name</label>
//                         <input className="input" type="text" id="name" value={formValue.name} onChange={changeValue} placeholder="Your name..."/>
//                     </div>
//                     <div className="error">{formValue.error.name}</div>
//                     <div className="row">
//                         <label>
//                             <input type="radio" checked={formValue.profileUrl=='../../assets/profile-images/Ellipse -3.png'} name="profileUrl" 
//                                 value="../../assets/profile-images/Ellipse -3.png" onChange={changeValue}/>

//                         </label>
//                     </div>
//                 </form>
//             </div>
//             {/* <p> Hello </p> */}
//         </div>
//     )
// }


class PayrollForm extends Component{
    constructor(props){
        super(props)

        this.state={
            id: this.props.match.params.id,
            name: '',
            salary: '',
            notes: '',
            day: '1',
            month: 'Jan',
            year: '2020',
            gender: '',
            profilePic: '',
            departments: []
        }
        this.changeNameHandler=this.changeNameHandler.bind(this);
        this.changeSalaryHandler=this.changeSalaryHandler.bind(this);
        this.changeNotesHandler=this.changeNotesHandler.bind(this);
        this.changeGenderHandler=this.changeGenderHandler.bind(this);
        this.changeDayHandler=this.changeDayHandler.bind(this);
        this.changeMonthHandler=this.changeMonthHandler.bind(this);
        this.changeYearHandler=this.changeYearHandler.bind(this);
        this.changeProfilePicHandler=this. changeProfilePicHandler.bind(this);
        
        // this.getChecked=this.getChecked.bind(this);
        // this.onCheckChange=this.onCheckChange.bind(this);

    }
    componentWillMount(){
        if(this.state.id === '_add'){
            return
        }else{
            EmployeeService.getEmployeeById(this.state.id).then( (res) =>{
                let employee = res.data.data;
                console.log(employee);
                let date= employee.startDate.split("-");
                let Oday=date[2];
                let Omonth=date[1];
                let Oyear=date[0];
                let Oname=employee.name;
                let Onotes=employee.notes;
                let Odepartments=employee.departments;
                let Osalary=employee.salary;
                let Ogender=employee.gender;
                let OprofilePic=employee.profilePic;

                this.setState({name: Oname,
                    salary: Osalary,
                    gender: Ogender,
                    notes: Onotes,
                    profilePic: OprofilePic,
                    departments: Odepartments,
                    year: Oyear,
                    day: Oday,
                    month: Omonth
                });
            });
        } 
        console.log("The state is");
        console.log(this.state);       
    }
    saveOrUpdateEmployee = (event) => {
        event.preventDefault();
        console.log(this.state.departments);
        let employee = {
            name: this.state.name,
            departments : this.state.departments,
            gender: this.state.gender,
            salary: this.state.salary,
            startDate: `${this.state.year}-${this.state.month}-${this.state.day}`,
            notes: this.state.notes,
            // id: formValue.id,
            profilePic: this.state.profilePic,
          };
        console.log('employee => ' + JSON.stringify(employee));
        // EmployeeService.createEmployee(employee);


        if(this.state.id === '_add'){
            EmployeeService.createEmployee(employee).then(res =>{
                this.props.history.push('/home');
            });
        }else{
            EmployeeService.updateEmployee(employee, this.state.id).then( res => {
                this.props.history.push('/home');
            });
        }
    }
    getChecked =(name) =>{
        return this.state.departments.includes(name);
    }
    onCheckChange =(event) =>{
        
        const target = event.target;
        var value= target.value;
        if(target.checked){
            this.state.departments.push(value);
        }
        else{
            this.state.departments.slice(value,1);
        }
        // console.log(this.state.departments);
        // let index = this.state.departments.indexOf(name);
        // let checkArray =this.state.departments;
        // if(index>-1)
        //     checkArray.splice(index,1)
        // else 
        // checkArray.push(name);
        // console.log(checkArray);
        // this.setState({departments:checkArray});
        // this.setState({departments: [...this.state.departments,name]});
        // console.log("departments selected "+this.state.departments);
    }
    changeNameHandler =(event)=>{
        this.setState({name:event.target.value});
        console.log("name is "+this.state.name);
    }
    changeSalaryHandler =(event)=>{
        this.setState({salary:event.target.value});
        console.log("salary chosen is"+this.state.salary);
    }
    changeNotesHandler =(event)=>{
        this.setState({notes: event.target.value});
        console.log("notes entered is "+this.state.notes);
    }
    changeGenderHandler =(event)=>{
        
        this.setState({gender: event.target.value});
        console.log("gender is" + this.state.gender);
    }
    changeProfilePicHandler =(event)=>{
        this.setState({profilePic: event.target.value});
        console.log("profilepic is "+this.state.profilePic);
    }
    changeDayHandler=(event)=>{
        this.setState({day:event.target.value});
        console.log("day entered is"+this.state.day);
    }
    changeMonthHandler=(event)=>{
        // let monthEntered= event.target.value;
        this.setState({month:event.target.value});
        console.log("month entered is"+this.state.month);
    }
    changeYearHandler=(event)=>{
        this.setState({year:event.target.value});
        console.log("year entered is "+this.state.year);
    }
    cancel(){
        // this.props.history.push('/employees');
    }
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
                <div class="form-content">
                    <form class="form" action="#">
                        <div class="form-head">
                            Employee Payroll Form
                        </div>
                        <div class="row-content">
                            <label class="label text" for="name">Name</label>
                            <input class="input" value={this.state.name} onChange={this.changeNameHandler} type="text" id="name" name="name" placeholder="Enter Your name" required></input>
                            <error-output class="text-error" for="text"></error-output>
                        </div>
                        <div class="row-content">
                            <label class="label text" for="profile">Profile image</label>
                            <div class="profile-radio-content">
                                <label>
                                    <input type="radio" id="profile1" name="profile" checked={this.state.profilePic === '../../assets/profile-images/Ellipse -3.png'}
                                        value="../../assets/profile-images/Ellipse -3.png" onChange={this.changeProfilePicHandler} required/>
                                    <img class="profile" id='image1' src={profile1}/>  
                                </label>
                                <label>
                                    <input type="radio" id="profile2" name="profile"
                                        value="../../assets/profile-images/Ellipse -1.png" checked={this.state.profilePic === '../../assets/profile-images/Ellipse -1.png'} onChange={this.changeProfilePicHandler} required/>
                                    <img class="profile" id='image2' src={profile2}/>  
                                </label>
                                <label>
                                    <input type="radio" id="profile3" name="profile" checked={this.state.profilePic === '../../assets/profile-images/Ellipse -8.png'}
                                        value="../../assets/profile-images/Ellipse -8.png" onChange={this.changeProfilePicHandler}  required/>
                                    <img class="profile" id='image3' src={profile3}/>  
                                </label>
                                <label>
                                    <input type="radio" id="profile4" name="profile" checked={this.state.profilePic === '../../assets/profile-images/Ellipse -7.png'}
                                        value="../../assets/profile-images/Ellipse -7.png" onChange={this.changeProfilePicHandler}  required/>
                                    <img class="profile" id='image4' src={profile4}/>  
                                </label>
                            </div>
                        </div>
                        <div class="row-content">
                            <label class="label text" for="gender">Gender</label>
                            <div>
                                <input type="radio" id="male" name="gender" value='M' checked={this.state.gender === 'M'} onChange={this.changeGenderHandler}/>
                                <label class="text" for="male">Male</label>
                                <input type="radio" id="female" name="gender" value='F' checked={this.state.gender === 'F'} onChange={this.changeGenderHandler}/>
                                <label class="text" for="female">Female</label>
                            </div>
                        </div>
                        <div class="row-content">
                            <label class="label text" for="department">Department</label>
                            <div>
                                <input class="checkbox" type="checkbox" id="hr" name="department" value="HR" checked={this.state.departments.includes("HR")} onChange={this.onCheckChange}/>
                                <label class="text" for="hr">HR</label>
                                <input class="checkbox" type="checkbox" id="sales" name="department" value="Sales" checked={this.state.departments.includes("Sales")} onChange={this.onCheckChange}/>
                                <label class="text" for="sales">Sales</label>
                                <input class="checkbox" type="checkbox" id="finance" name="department" value="finance" checked={this.state.departments.includes("finance")} onChange={this.onCheckChange} />
                                <label class="text" for="finance">Finance</label>
                                <input class="checkbox" type="checkbox" id="engineer" name="department" value="Engineer" checked={this.state.departments.includes("Engineer")} onChange={this.onCheckChange}/>
                                <label class="text" for="engineer">Engineer</label>
                                <input class="checkbox" type="checkbox" id="others" name="department" value="Others" checked={this.state.departments.includes("Others")} onChange={this.onCheckChange}/>
                                <label class="text" for="others">Others</label>
                            </div>
                        </div>
                        <div class="row-content">
                            <label class="label text" for="salary">Choose your salary: </label>
                            <input class="input" onChange={this.changeSalaryHandler} type="range" name="salary" id="salary" min="300000"
                                    max="500000" step="100" value={this.state.salary}/>
                            <output class="salary-output text" for="salary">{this.state.salary}</output>
                        </div>
                        <div class="row-content">
                        <label class="label text" for="startDate">Start Date</label>
                        <div>
                            <select id="day" name="day" value={this.state.day} onChange={this.changeDayHandler}> 
                                <option value="01">1</option>
                                <option value="02">2</option>
                                <option value="03">3</option>
                                <option value="04">4</option>
                                <option value="05">5</option>
                                <option value="06">6</option>
                                <option value="07">7</option>
                                <option value="08">8</option>
                                <option value="09">9</option>
                                <option value="10">10</option>
                                <option value="11">11</option>
                                <option value="12">12</option>
                                <option value="13">13</option>
                                <option value="14">14</option>
                                <option value="15">15</option>
                                <option value="16">16</option>
                                <option value="17">17</option>
                                <option value="18">18</option>
                                <option value="19">19</option>
                                <option value="20">20</option>
                                <option value="21">21</option>
                                <option value="22">22</option>
                                <option value="23">23</option>
                                <option value="24">24</option>
                                <option value="25">25</option>
                                <option value="26">26</option>
                                <option value="27">27</option>
                                <option value="28">28</option>
                                <option value="29">29</option>
                                <option value="30">30</option>
                                <option value="31">31</option>
                            </select>
                            <select id="month" value={this.state.month} name="Month" onChange={this.changeMonthHandler}>
                                <option value="01">January</option>
                                <option value="02">Febuary</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                            </select>
                            <select id="year" name="Year" value={this.state.year} onChange={this.changeYearHandler}>
                                <option value="2020">2020</option>
                                <option value="2019">2019</option>
                                <option value="2018">2018</option>
                                <option value="2017">2017</option>
                                <option value="2016">2016</option>
                            </select>
                        </div>
                    </div>
                    <div class="row-content">
                        <label class="label text" for="notes">Notes</label>
                        <textarea id="notes" value={this.state.notes} onChange={this.changeNotesHandler} class="input" name="Notes" placeholder="" style={{ height: '100%' }}></textarea>
                    </div>
                    <div class="buttonParent">
                        <a href="./employee_payroll_home.html" class="resetButton button cancelButton">Cancel</a>
                        <div class="submit-reset">
                            <button type="submit" class="button submitButton" id="submitButton" onClick={this.saveOrUpdateEmployee}>Submit</button>
                            <button type="reset" class="resetButton button">Reset</button>
                        </div>
                    </div>
                    </form>
                </div>
            </div>
        )
    }
}

export default withRouter(PayrollForm)


