
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatListModule} from '@angular/material/list';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import {MatRadioModule} from '@angular/material/radio';
import { RouterModule, Routes } from '@angular/router';

import {AboutComponent } from './about/about.component';
import {AppComponent } from './app.component';
import {ProductsComponent } from './products/products.component';
import {ProductComponent } from './product/product.component';

import { ProductListService } from './shared/product-list.service';
import { DetailComponent } from './detail/detail.component';

import { HttpClientModule } from '@angular/common/http';
import {ShoppingCartComponent } from './shoppingCart/shoppingCart.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';



export const appRoutes: Routes = [
  { path: '', component: ProductsComponent},
  { path: 'about', component: AboutComponent},
  { path: 'product/:id', component: DetailComponent},
  
];

@NgModule({
  declarations: [		
    AppComponent,
    ProductsComponent,
    ProductComponent,
    AboutComponent,
    DetailComponent,
    ShoppingCartComponent,
    
   ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatListModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatInputModule,
    MatRadioModule,
    HttpClientModule,
    MatGridListModule,
    MatSidenavModule,

    RouterModule.forRoot(
      appRoutes)],
  exports: [RouterModule],
  providers: [ProductListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
