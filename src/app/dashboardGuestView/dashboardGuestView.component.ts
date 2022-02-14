import { LocalStorageService } from './../shared/localStorage.service';
import { BreakpointObserver } from '@angular/cdk/layout';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboardGuestView',
  templateUrl: './dashboardGuestView.component.html',
  styleUrls: ['./dashboardGuestView.component.scss']
})

export class DashboardGuestViewComponent{
  @ViewChild(MatSidenav)
 sidenav!: MatSidenav;

  constructor(private observer: BreakpointObserver, private localStorageServie: LocalStorageService, private router: Router) {}

  ngAfterViewInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((res) => {
      if (res.matches) {
        this.sidenav.mode = 'over';
        this.sidenav.close();
      } else {
        this.sidenav.mode = 'side';
        this.sidenav.open();
      }
    });
  }

  exit(){
    this.localStorageServie.clearData();
    console.log("Local Storage empty");
    window.location.href = 'https://www.google.at/';
  }
}