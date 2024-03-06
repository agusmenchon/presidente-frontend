import { Routes } from '@angular/router';
import { authGuard } from './login/guards/auth.guard';
// import { FormInicioComponent } from './login/form-inicio/form-inicio.component';
// import { PresidenteGameComponent } from './game/presidente-game/presidente-game.component';
// import { LoadingComponent } from './game/loading/loading.component';

export const routes: Routes = [
    {
        path: 'home',
        loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
    },
    {
        path: 'game',
        loadChildren: () => import('./game/game.module').then(m => m.GameModule),
        canActivate: [ authGuard ]
    },
    // {
    //     path: `loading/:idSala`, component: LoadingComponent
    // },
    {
        path: '**', redirectTo: 'home'
    }
];
