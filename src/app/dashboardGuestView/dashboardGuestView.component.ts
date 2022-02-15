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

  /**
   * Passt die darstellung je nach Seitengröße an.
   * Seitenlänge < 800px: Sidenav soll nach links verschwinden.
   */
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

  /**
   * Vom Tisch abmelden.
   * Localstorage wird geleert.
   */
  exit(){
    this.localStorageServie.clearData();
    window.location.href = 'https://www.google.at/';
  }
}