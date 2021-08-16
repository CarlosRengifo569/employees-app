import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router'
import swal from 'sweetalert2'
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html'
})
export class FormComponent implements OnInit {

  public employee: Employee = new Employee();
  public employeesList: Array<Employee> = new Array<Employee>();
  public title:string = "Add Employee";
  public errors: string[];

  constructor(private employeeService: EmployeeService,
  private router: Router) { }

  ngOnInit() {
    this.loadEmployees()
  }

  loadEmployees(): void{
      this.employeeService.getEmployeesList().subscribe( (employees) => this.employeesList = employees)
  }

  create(): void {
    if(this.employee.id < 1) {
      swal('Error', `Id: ${this.employee.id} invalid format`, 'error');
    } else {
      let ban = this.employeesList.find(x => x.id == this.employee.id);
      if(ban) {
        swal('Error', `Id: ${this.employee.id} already exist`, 'error');
      } else {
        this.employeeService.create(this.employee)
        .subscribe(employee => {
          this.router.navigate(['/employees'])
          swal('New employee', `Employee: ${employee.fullName} created successfully`, 'success')
        }, err => {
          this.errors = err.error.errors as string[];
        });
      }
    }
  }
}
