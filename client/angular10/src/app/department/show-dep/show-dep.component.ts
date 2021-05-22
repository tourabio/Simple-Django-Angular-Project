import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared.service';

@Component({
  selector: 'app-show-dep',
  templateUrl: './show-dep.component.html',
  styleUrls: ['./show-dep.component.css']
})
export class ShowDepComponent implements OnInit {

  constructor(private service : SharedService) { }

  departmentList : any[];
  ModalTitle:String;
  ActivateAddEditDepComp:boolean=false;
  dep:any;

  DepartmentIdFilter:String="";
  DepartmentNameFilter:String="";
  DepartmentListWithoutFilter:any[];

  ngOnInit(): void {
    this.refreshDepList();
  }


 refreshDepList(){
   this.service.getDepList().subscribe(data=>{
    this.departmentList = data;
    this.DepartmentListWithoutFilter = data;
   })
 }
 addClick(){
  this.dep = {
    DepartmentId:0,
    DepartmentName:""
  }
  this.ModalTitle = "Add department";
  this.ActivateAddEditDepComp=true;
  
 }

 editClick(item){
  this.dep = item;
  this.ModalTitle = "Edit Department";
  this.ActivateAddEditDepComp=true;
 
 }



 closeClick(){
  this.ActivateAddEditDepComp = false;
  this.refreshDepList();
 }

 deleteClick(item){
   if(confirm('Are you sure ??')){
     this.service.deleteDepartment(item.DepartmentId).subscribe(res=>{
       alert(res.toString());
       this.refreshDepList();
     });
     
   }
 }

filterFn(){
  var DepartmentIdFilter = this.DepartmentIdFilter;
  var DepartmentNameFilter = this.DepartmentNameFilter;
  this.departmentList = this.DepartmentListWithoutFilter.filter(function(e1){
    return e1.DepartmentId.toString().toLowerCase().includes(
      DepartmentIdFilter.toString().trim().toLowerCase()
    )&&
    e1.DepartmentName.toString().toLowerCase().includes(
      DepartmentNameFilter.toString().trim().toLowerCase()
    )
  });
}
sortResult(prop, asc){
  this.departmentList = this.DepartmentListWithoutFilter.sort(function(a,b){
    if(asc){
      return (a[prop]>b[prop]?1:((a[prop]<b[prop]) ? -1 : 0));
    }
    else{
      return (b[prop]>a[prop]?1:((b[prop]<a[prop]) ? -1 : 0));

    }
  })
}

}
