import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-add-edit-emp',
  templateUrl: './add-edit-emp.component.html',
  styleUrls: ['./add-edit-emp.component.css']
})
export class AddEditEmpComponent implements OnInit {

  constructor(private service : SharedService) { }

  @Input() emp:any;
  EmployeeId:String;
  EmployeeName:String;
  Department:String;
  DateOfJoining:String;
  PhotoFileName:String;
  PhotoFilePath:String;
  DepartmentList : any = [];


  ngOnInit(): void {
    this.loadDepartmentList();
    this.EmployeeId = this.emp.EmployeeId;
    this.EmployeeName = this.emp.EmployeeName;
    this.Department = this.emp.Department;
    this.DateOfJoining = this.emp.DateOfJoining;
    this.PhotoFileName = this.emp.PhotoFileName;
    this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
  }


loadDepartmentList(){
  this.service.getAllDepartmentNames().subscribe(data=>{
    this.DepartmentList = data;
  });
}


  addEmployee(){
    var val = {
      EmployeeId : this.EmployeeId,
      EmployeeName : this.EmployeeName,
      Department : this.Department,
      DateOfJoining : this.DateOfJoining,
      PhotoFileName : this.PhotoFileName,
    };
    this.service.addEmployee(val).subscribe(res=>{
      alert(res.toString());
    })
  }
  editEmployee(){
    var val = {
      EmployeeId : this.EmployeeId,
      EmployeeName : this.EmployeeName,
      Department : this.Department,
      DateOfJoining : this.DateOfJoining,
      PhotoFileName : this.PhotoFileName,
    };
    this.service.updateEmployee(val).subscribe(res=>{
      alert(res.toString());
    })
  }
  uploadPhoto(event){
    var file = event.target.files[0];
    const formData:FormData = new FormData();
    formData.append('uploadedFile', file, file.name);

    this.service.UploadPhoto(formData).subscribe(data=>{
      this.PhotoFileName = data.toString();
      this.PhotoFilePath = this.service.PhotoUrl + this.PhotoFileName;
    })
  }









}
