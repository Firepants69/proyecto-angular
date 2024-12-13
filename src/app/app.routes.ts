import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { authenticatedGuard } from './core/guards/authenticated.guard';
import { BoardListComponent } from './board/board-list/board-list.component';
import { CommentComponent } from './comment/comment.component';
import { RouterModule } from '@angular/router';
import { MakePostComponent } from './make-post/make-post.component';
import { ThradComponent } from './threads/thrad/thrad.component';
import { EditProfileComponent } from './edit-profile/edit-profile.component';
import { UpdatePostComponent } from './update-post/update-post.component';
import { RegisterComponent } from './business/authentication/register/register.component';

export const routes: Routes = [
    {
        path: '',
        loadComponent: () => import('./shared/components/layout/layout.component'),
        children: [
            {
                path: 'dashboard',
                loadComponent: () => import('./business/dashboard/dashboard.component'),
                canActivate: [authGuard]
            },
            {
                path: 'profile',
                loadComponent: () => import('./business/profile/profile.component'),
                canActivate: [authGuard]
            },
            
            {
                path: '',
                redirectTo: 'board',
                pathMatch: 'full'
            },
            {
                path: 'board',
                component: BoardListComponent,
                canActivate: [authGuard]

            },
            {
                path: 'comments/:id', 
                component: CommentComponent,
                canActivate: [authGuard]

            },
            {
                path: 'update-post',
                component: UpdatePostComponent,
                canActivate: [authGuard]
            },
            {
                path: 'make-post',
                component: MakePostComponent,
                canActivate: [authGuard]
            },{
                path: 'edit-profile',
                component: EditProfileComponent,
                canActivate: [authGuard]
            },{
                path: 'register',
                component: RegisterComponent,
            }


        ]
    },
    {
        path: 'login',
        loadComponent: () => import('./business/authentication/login/login.component'),
        canActivate: [authenticatedGuard]
    },
    {
        path: '**',
        redirectTo: 'board'
    }
];
