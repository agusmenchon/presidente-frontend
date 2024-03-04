import { Routes } from '@angular/router';
import { FormInicioComponent } from './components/form-inicio/form-inicio.component';
import { PresidenteGameComponent } from './components/presidente-game/presidente-game.component';
import { LoadingComponent } from './components/loading/loading.component';

export const routes: Routes = [
    {
        path: 'home', component: FormInicioComponent,
    },
    {
        path: 'game/:roomId', component: PresidenteGameComponent,
    },
    {
        path: `loading/:idSala`, component: LoadingComponent
    },
    {
        path: '**', redirectTo: 'home'
    }
];
