import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { Employee } from '../models/employee';
import { EmployeeService } from '../services/employee.service';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html'
})
export class EmployeesComponent implements OnInit {

  employees: Employee[];
  paginator: any;
  employeesList: Array<Employee>;

  constructor(
    private employeeService: EmployeeService,
    private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.loadEmployees();
    this.getEmployeesGrid();
  }

  getEmployeesGrid () {
    this.activatedRoute.paramMap.subscribe( params => {
      let page: number = + params.get('page');
      if(!page) {
        page = 0;
      }
      this.employeeService.getEmployees(page).subscribe(
        response => {
          this.employees = response.content as Employee[];
          this.employees.forEach(boss => {
            this.employeesList.forEach(employee => {
              if(boss.bossId == employee.id) {
                boss.bossName = employee.fullName;
              }
            })
          });
          this.paginator = response;
        });
    });
  }

  loadEmployees(): void{
    this.employeeService.getEmployeesList().subscribe( (employees) => this.employeesList = employees)
  }
}
