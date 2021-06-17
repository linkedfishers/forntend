import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/interfaces/users.interface';
import {Provider} from 'src/app/interfaces/provider.interface'
import { AuthService } from 'src/app/services/auth.service';
import { AuthProviderService } from 'src/app/services/authProvider.serices';
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
    private authProviderService: AuthProviderService
  ) {}

  isLoggedIn = false;
  currentUser: User;
  currentProvider: Provider;
  ngOnInit(): void {
    liquidify();
    loadSvg();
    initTooltips();
    initCharts();
    initHexagons();
    initPopups();
    initLoader();
    initSidebar();
    this.currentUser = this.authService.getCurrentUser();
    this.currentProvider = this.authProviderService.getCurrentProvider();
  }
}
