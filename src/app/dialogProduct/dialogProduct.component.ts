import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialogProduct',
  templateUrl: './dialogProduct.component.html',
  styleUrls: ['./dialogProduct.component.css']
})
export class DialogProductComponent implements OnInit {

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }

}
