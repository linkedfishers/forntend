import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
    providedIn: 'root'
})
export class AuthGuard implements CanActivate {

    constructor(private authService: AuthService, private router: Router) { }

    canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
        if (state.url.startsWith("/login")) {
            if (!this.authService.isAuthenticated()) {
                return true;
            }
            this.router.navigate(['/']);
            return false;
        }
        if (state.url.startsWith("/admin")) {
            if (this.authService.isAdmin()) {
                return true;
            }
            this.router.navigate(['/']);
            return false;

        }
        return this.checkLogin();
    }

    checkLogin(): boolean {
        if (this.authService.isAuthenticated()) {
            return true;
        }
        // Navigate to the login page with extras
        this.router.navigate(['/login']);
        return false;
    }

}
