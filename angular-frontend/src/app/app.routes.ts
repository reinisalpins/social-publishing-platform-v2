import {Routes} from '@angular/router';
import {AuthLayoutComponent} from './layouts/auth-layout/auth-layout.component';
import {LoginComponent} from './pages/login/login.component';
import {AppLayoutComponent} from './layouts/app-layout/app-layout.component';
import {FeedComponent} from './pages/feed/feed.component';
import {RegisterComponent} from './pages/register/register.component';
import {ProfileComponent} from './pages/profile/profile.component';
import {PostComponent} from './pages/post/post.component';
import {ManagePostsComponent} from './pages/manage-posts/manage-posts.component';
import {CreatePostComponent} from './pages/create-post/create-post.component';
import {authGuard} from './guards/auth.guard';
import {guestGuard} from './guards/guest.guard';
import {CategoryResolverService} from './services/category-resolver.service';
import {UpdatePostComponent} from './pages/update-post/update-post.component';
import {NotFoundComponent} from './pages/not-found/not-found.component';
import {UnauthorizedComponent} from './pages/unauthorized/unauthorized.component';
import {CategoryPostsComponent} from './pages/category-posts/category-posts.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    canActivateChild: [authGuard],
    resolve: {categories: CategoryResolverService},
    children: [
      {path: '', component: FeedComponent},
      {path: 'profile', component: ProfileComponent},
      {path: 'post', component: PostComponent},
      {path: 'posts/manage', component: ManagePostsComponent},
      {path: 'posts/create', component: CreatePostComponent},
      {path: 'posts/:id/edit', component: UpdatePostComponent},
      {path: 'posts/:id', component: PostComponent},
      {path: 'not-found', component: NotFoundComponent},
      {path: 'unauthorized', component: UnauthorizedComponent},
      {path: 'categories/:slug', component: CategoryPostsComponent},
    ]
  },
  {
    path: '',
    component: AuthLayoutComponent,
    canActivateChild: [guestGuard],
    children: [
      {path: 'login', component: LoginComponent},
      {path: 'register', component: RegisterComponent}
    ]
  }
];
