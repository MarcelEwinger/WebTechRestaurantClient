import { MatDialogModule } from '@angular/material/dialog';

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


import { HttpClientModule } from '@angular/common/http';
import {ShoppingCartComponent } from './shoppingCart/shoppingCart.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { DialogProductComponent } from './dialogProduct/dialogProduct.component';
import { PaymentComponent } from './payment/payment.component';
import { WaiterComponent } from './waiter/waiter.component';
import { ReviewComponent } from './review/review.component';




export const appRoutes: Routes = [
  { path: '', component: AboutComponent},
  { path: 'about', component: AboutComponent},
  { path: 'table1/products', component: ProductsComponent},
  
  
];

@NgModule({
  declarations: [							
    AppComponent,
    ProductsComponent,
    ProductComponent,
    AboutComponent,
    ShoppingCartComponent,
      DialogProductComponent,
      PaymentComponent,
      WaiterComponent,
      ReviewComponent
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
    MatDialogModule,

    RouterModule.forRoot(
      appRoutes)],
  exports: [RouterModule],
  providers: [ProductListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
