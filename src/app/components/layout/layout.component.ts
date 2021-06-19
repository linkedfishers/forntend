import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/users.interface';
import { Provider } from 'src/app/interfaces/provider.interface'
import { AuthService } from 'src/app/services/auth.service';
declare var initSidebar,
  liquidify,
  initTooltips,
  loadSvg,
  initCharts,
  initHexagons,
  initPopups,
  initLoader: any;

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
  ) { }

  isLoggedIn = false;
  currentUser: User;
  currentProvider: Provider;
  ngOnInit(): void {
    loadSvg();
    initTooltips();
    initCharts();
    initHexagons();
    initPopups();
    initLoader();
    initSidebar();
    this.currentUser = this.authService.getCurrentUser();
  }
}
