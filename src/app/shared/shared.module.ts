import { LayoutsModule } from './components/layouts/layouts.module';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ErrorComponent } from './components/error/error.component';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

@NgModule({
  declarations: [ErrorComponent, FooterComponent, NavbarComponent],
  imports: [CommonModule, LayoutsModule, HttpClientModule, RouterModule],
  exports: [FooterComponent, NavbarComponent],
})
export class SharedModule {}
