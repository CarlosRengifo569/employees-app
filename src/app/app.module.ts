import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import { HeaderComponent } from './utilities/header/header.component';
import { FooterComponent } from './utilities/footer/footer.component';
import { EmployeesComponent } from './views/employees.component';
import { FormComponent } from './views/form.component';
import { PaginatorComponent } from './utilities/paginator/paginator.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { EmployeeService } from './services/employee.service';

const routes: Routes = [
  {path: '', redirectTo: '/employees', pathMatch: 'full'},
  {path: 'employees', component: EmployeesComponent},
  {path: 'employees/page/:page', component: EmployeesComponent},
  {path: 'employees/form', component: FormComponent},
  {path: 'employees/form/:id', component: FormComponent},
];

@NgModule({

  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    EmployeesComponent,
    FormComponent,
    PaginatorComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes),
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
