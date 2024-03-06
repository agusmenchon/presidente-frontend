import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { LoadingComponent } from './loading/loading.component';
import { PresidenteGameComponent } from './presidente-game/presidente-game.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: 'loading/:idSala',
        component: LoadingComponent
      },
      {
        path: 'play/:idSala',
        component: PresidenteGameComponent
      },
      {
        path: '**',
        redirectTo: 'home'
      }
    ]
  }
]

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class GameRoutingModule { }
