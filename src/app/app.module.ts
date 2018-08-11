import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
// import { ExperienceComponent } from './experience/experience.component';
import { ProjectComponent } from './project/project.component';
import { ContactComponent } from './contact/contact.component';
import { ExtraCurricularComponent } from './extra-curricular/extra-curricular.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

const appRoutes: Routes = [
  { path: '', component: HomeComponent },
  // { path: 'experience', component: ExperienceComponent },
  { path: 'project', component: ProjectComponent },
  { path: 'extra-curricular', component: ExtraCurricularComponent },
  { path: 'contact', component: ContactComponent }
  // { path: '**', component: HomeComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    // ExperienceComponent,
    ProjectComponent,
    ContactComponent,
    ExtraCurricularComponent
  ],
  imports: [BrowserModule,
    RouterModule.forRoot(appRoutes),
    FormsModule,
    HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
