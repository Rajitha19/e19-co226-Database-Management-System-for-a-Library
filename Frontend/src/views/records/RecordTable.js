import React from 'react';
import { variables } from 'Variables';
import BookSearch from './BookSearch';

export default class RecordsTable extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            records:[],
            students:[],
            books:[],
            users:[],
            bookTitle:"",
            role:"",
            issueDate:"",
            expectedReturnDate:"",
            status:"",
            userName:"",
            notes:"",
            issueId:0,
            userId:0,
            nic:0,
            bookId:0
        }
    }
    
    refreshList() {
        fetch(variables.API_URL+'Borrowers')
        .then(response=>response.json())
        .then(data=>{this.setState({records:data});
        })        
        fetch(variables.API_URL+'Students')
        .then(response=>response.json())
        .then(data=>{this.setState({students:data});
        });
        fetch(variables.API_URL+'user')
        .then(response=>response.json())
        .then(data=>{this.setState({users:data});
        });
        fetch(variables.API_URL+'books')
        .then(response=>response.json())
        .then(data=>{this.setState({books:data});
        })
    }

    componentDidMount()
    {
        this.refreshList();
    }

    changeBorrowDate = (e)=>{
        this.setState({issueDate:e.target.value});
    }
    changeDueDate = (e)=>{
        this.setState({expectedReturnDate:e.target.value});
    }
    changeStatus = (e)=>{
        this.setState({status:e.target.value});
    }
    changeCopies = (e)=>{
        this.setState({notes:e.target.value});
    }
    changeStudentId = (e)=>{
        this.setState({nic:e.target.value});
    }
    changeUserId = (e)=>{
        this.setState({userId:e.target.value});
    }
    changeBookId = (e)=>{
        this.setState({bookId:e.target.value});
    }

    addClick(){
        this.setState({
            modalTitle:'Add Record',
            issueId:0,
            bookTitle:"",
            role:"",
            issueDate:"",
            expectedReturnDate:"",
            status:"",
            userName:"",
            notes:""
        });
    }

    editClick(cs){
        this.setState({
            modalTitle:'Edit Record',
            issueId:cs.issueId,
            issueDate:cs.issueDate,
            expectedReturnDate:cs.expectedReturnDate,
            status:cs.status,
            notes:cs.notes,
            bookTitle:cs.bookTitle,
            role:cs.role,
            userName:cs.userName,
            bookId:cs.bookId,
            nic:cs.nic,
            userId:cs.userId,
        });
    }

    createClick(){
        fetch(variables.API_URL+'Borrowers',{
            method:'POST',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                issueDate:this.state.issueDate,
                expectedReturnDate:this.state.expectedReturnDate,
                status:this.state.status,
                notes:this.state.notes,
                bookId:this.state.bookId,
                nic:this.state.nic,
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
            // eslint-disable-next-line
        },(error)=>{
            alert('Failed');
        })
    }

    updateClick(){
        fetch(variables.API_URL+'Borrowers',{
            method:'PUT',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                issueId:this.state.issueId,
                issueDate:this.state.issueDate,
                expectedReturnDate:this.state.expectedReturnDate,
                status:this.state.status,
                notes:this.state.notes,
                bookId:this.state.bookId,
                nic:this.state.nic,
                userId:this.state.userId,
                // role:this.state.role,
                // userName:this.state.userName,

            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
            // eslint-disable-next-line
        },(error)=>{
            alert('Failed');
        })
    }

    deleteClick(cs){
        if(window.confirm('Are you Sure to Delete?')) {
        fetch(variables.API_URL+'Borrowers',{
            method:'DELETE',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                issueId:cs.issueId
            })
        })
        .then(res=>res.json())
        .then((result)=>{
            alert(result);
            this.refreshList();
            // eslint-disable-next-line
        },(error)=>{
            alert('Failed');
        })}
    }

    render(){
        const {
            records,
            students,
            modalTitle,
            books,
            users,
            bookTitle,
            role,
            issueDate,
            expectedReturnDate,
            status,
            userName,
            notes,
            issueId,
            nic,
            bookId,
            userId,
        } = this.state;

        return(
            <div>
                <button type='button'
                className='btn btn-primary mt-3 mb-3 float-end'
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                onClick={()=>this.addClick()}>
                    Add Record
                </button>
                <div className='table-responsive' style={{borderRadius: '5px'}}>
                <table className="table table-borderless table-hover">
                    <thead style={{background:'#90caf9'}}>
                        <tr>
                            <th>Id</th>
                            <th>Book Title</th>
                            <th>Roll No</th>
                            <th>Borrow Date</th>
                            <th>Due Date</th>
                            <th>Status</th>
                            <th>Copies</th>
                            <th>User</th>
                            <th>Options</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            records.map(cs=>
                                <tr key={cs.issueId}>
                                    <td>{cs.issueId}</td>
                                    <td>{cs.bookTitle}</td>
                                    <td>{cs.role}</td>
                                    <td>{cs.issueDate}</td>
                                    <td>{cs.expectedReturnDate}</td>
                                    <td>{cs.status}</td>
                                    <td>{cs.notes}</td>
                                    <td>{cs.userName}</td>
                                    
                                    <td>
                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            onClick={()=>this.editClick(cs)}>
                                            <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                width="18" height="18"
                                                    viewBox="0 0 48 48">
                                                    <path fill="#3F51B5" d="M38,13c0,0.553-0.447,1-1,1H5c-0.552,0-1-0.447-1-1V6c0-0.553,0.448-1,1-1h32c0.553,0,1,0.447,1,1V13z"></path><path fill="#BBDEFB" d="M4 10H38V39H4z"></path><path fill="#E57373" d="M43.678,25.142l-2.82-2.819c-0.429-0.43-1.126-0.43-1.555,0l-1.328,1.328l4.376,4.375l1.327-1.328C44.107,26.268,44.107,25.572,43.678,25.142"></path><path fill="#FF9800" d="M23.109 31.089H40.525000000000006V37.277H23.109z" transform="rotate(-45.001 31.818 34.184)"></path><path fill="#B0BEC5" d="M37.521 23.837H40.615V30.026H37.521z" transform="rotate(134.983 39.068 26.933)"></path><path fill="#FFC107" d="M23.473 38.152L22 44 27.848 42.528z"></path><path fill="#37474F" d="M22.744 41.044L22 44 24.956 43.256z"></path><path fill="#1976D2" d="M27.796 31L15 31 15 33 25.797 33zM31 27.796L31 27 15 27 15 29 29.796 29zM15 19H31V21H15zM15 15H31V17H15zM11 15H13V17H11zM11 19H13V21H11zM11 31H13V33H11z"></path><path fill="#1976D2" d="M15 31v2h7c0-.684.071-1.351.191-2H15zM11 23H13V25H11zM11 27H13V29H11zM15 23H31V25H15z"></path>
                                            </svg>
                                        </button>
                                        <button type="button"
                                            className="btn btn-light mr-1"
                                            onClick={()=>this.deleteClick(cs)}>
                                                <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                                                width="18" height="18"
                                                viewBox="0 0 48 48">
                                                <path fill="#ff3d00" d="M34,11l-6-6h-8l-6,6h-3v28c0,2.2,1.8,4,4,4h18c2.2,0,4-1.8,4-4V11H34z"></path><path fill="#ff6e40" d="M11,7h26c1.1,0,2,0.9,2,2v2H9V9C9,7.9,9.9,7,11,7z"></path><path fill="#fafafa" d="M15.515 25H32.486000000000004V29H15.515z" transform="rotate(-45.001 24 27)"></path><path fill="#fafafa" d="M22 18.515H26V35.486000000000004H22z" transform="rotate(-45.001 24 27)"></path>
                                                </svg>
                                        </button>
                                    </td>
                                    
                                </tr>
                            )
                        }
                    </tbody>
                    <caption>
                        List of Orders
                    </caption>
                </table>
                </div>
      
                
                <div className="modal fade" id="exampleModal" tabIndex="-1" aria-hidden="true">
                    <div className="modal-dialog modal-lg modal-dialog-centered">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{modalTitle}</h5>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>

                            <div className="modal-body">
                                <div className="input-group mb-3">

                                <span className="input-group-text col">Book</span>
                                {/* <BookSearch books={books} /> */}
                                <select value={bookId} onChange={this.changeBookId}  class="form-select" aria-label="Default select example">
                                <option selected>{bookTitle}</option>
                                {books.map(br => (
                                    <option value={br.bookId}>{br.bookTitle}</option>
                                ))}
                                </select>

                                <span className="input-group-text ml-2 col">NIC</span>
                                <select value={nic} onChange={this.changeStudentId} class="form-select" aria-label="Default select example">
                                <option selected>{role}</option>
                                {students.map(rm => (
                                    <option value={rm.nic}>{rm.nic}</option>
                                ))}
                                </select>

                                <span className="input-group-text ml-2 col">User</span>
                                <select value={userId} onChange={this.changeUserId} class="form-select" aria-label="Default select example">
                                <option selected>{userName}</option>
                                {users.map(rm => (
                                    <option value={rm.userId}>{rm.userName}</option>
                                ))}
                                </select>

                                </div>

   

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Borrow Date</span>
                                    <input id='bd' type="date" className="form-control" value={issueDate} onChange={this.changeBorrowDate}/>
                                </div>
                                <div className="input-group mb-3">
                                    <span className="input-group-text">Due Date</span>
                                    <input type="date" className="form-control" value={expectedReturnDate} onChange={this.changeDueDate}/>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Status</span>
                                    <select className="form-control" value={status} onChange={this.changeStatus}>
                                        <option selected></option>
                                        <option value="0">Not Returned</option>
                                        <option value="1">Returned</option>
                                    </select>
                                </div>

                                <div className="input-group mb-3">
                                    <span className="input-group-text">Copies</span>
                                    <input type="text" className="form-control" value={notes} onChange={this.changeCopies}/>
                                </div>


                                {issueId===0?
                                <button type="button"
                                className="btn btn-primary float-start"
                                onClick={()=>this.createClick()}
                                >Create</button>
                                :null}

                                {issueId!==0?
                                <button type="button"
                                className="btn btn-primary float-start"
                                onClick={()=>this.updateClick()}
                                >Update</button>
                                :null}

                            </div>
                        </div>
                    </div>
                </div>
        </div>
    
        )
    }
}
