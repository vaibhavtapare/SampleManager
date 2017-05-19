import { Routes } from "@angular/router"
import { LoginComponent } from "app/login/login.component";
import { DashboardComponent } from "app/dashboard/dashboard.component";


export const routes: Routes = [
    { path: '', component: LoginComponent  }, 
    { path: '\dashboard', component: DashboardComponent}
] 

