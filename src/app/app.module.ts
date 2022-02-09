
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

import { DbService } from './shared/db.service';

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
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import { MatSnackBarModule } from '@angular/material/snack-bar';





const routes: Routes = [
  {path: ':table/dashboard',
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
    MatSelectModule,
    MatExpansionModule,
    MatSnackBarModule,
    RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [ProductListService, LocalStorageService, DbService],
  bootstrap: [AppComponent]
})
export class AppModule { }
