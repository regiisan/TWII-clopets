import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { RegisterComponent } from './pages/register/register.component';
import { PerfilComponent } from './pages/perfil/perfil.component'; // <-- IMPORTANTE

export const authRoutes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegisterComponent },
  { path: 'perfil', component: PerfilComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];
