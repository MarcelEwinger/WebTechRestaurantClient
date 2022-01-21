import { LocalStorageService } from './shared/localStorage.service';

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
import { DashboardGuestViewComponent } from './dashboardGuestView/dashboardGuestView.component';
import { OrderComponent } from './order/order.component';



/*
export const appRoutes: Routes = [
  { path: '', component: DashboardGuestViewComponent},
  { path: 'table1/products', component: ProductsComponent},
  { path: 'table1/products/payment', component: PaymentComponent},
  { path: 'table1/products/waiter', component: WaiterComponent},
  { path: 'table1/products/review', component: ReviewComponent},
  { path: 'table1/products/order', component: OrderComponent}
  
  
];

*/

const routes: Routes = [
  {path: 'dashboard',
  component: DashboardGuestViewComponent,
  children:[
    {
      path:"",
      redirectTo:"products",
      pathMatch:"full"
    },
    {
      path: "products",
      component: ProductsComponent
    },
    {
      path: "payment",
      component: PaymentComponent
    },
    {
      path: "waiter",
      component: WaiterComponent
    },
    {
      path: "review",
      component: ReviewComponent
    },
    {
      path: "order",
      component: OrderComponent
    }
  ]
}
]

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
    ReviewComponent,
      DashboardGuestViewComponent,
      OrderComponent
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
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ProductListService, LocalStorageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
