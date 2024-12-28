import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { Page1Component } from './page1/page1.component';
import { HomeComponent } from './home/home.component';
import { Page2Component } from './page2/page2.component';
import { Page3Component } from './page3/page3.component';
import { Page4Component } from './page4/page4.component';
import { ResultPageComponent } from './result-page/result-page.component';

export const routes: Routes = [
    { path: "", component: LoginComponent },
    { path: "login", component: LoginComponent },
    { path: "home", component: HomeComponent },
    { path: "page1", component: Page1Component },
    { path: "page2", component: Page2Component },
    { path: "page3", component: Page3Component },
    { path: "page4", component: Page4Component },
    { path: "result-page", component: ResultPageComponent }

];
