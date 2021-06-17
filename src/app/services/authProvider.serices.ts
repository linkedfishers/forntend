import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Provider } from 'src/app/interfaces/provider.interface';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class AuthProviderService {
  readonly API: string = environment.apiUrl;

  constructor(
    private httpClient: HttpClient,
    private translate: TranslateService
  ) {}

  readonly ID_TOKEN = 'accessToken';
  public authenticate(email: string, password: string) {
    return this.httpClient
      .post<any>(`${this.API}/authProvider/signin`, { email, password })
      .pipe(tap((res) => this.setSession(res.data)));
  }

  public signUp(provider: any) {
    return this.httpClient.post<any>(
      this.API + '/authProvider/signup',
      provider
    );
  }

  verifyActivationToken(token: string) {
    return this.httpClient.get<any>(
      this.API + '/authProvider/activate/' + token
    );
  }
  public resetPasswordRequest(email: string) {
    return this.httpClient.post<any>(
      this.API + '/authProvider/password-reset-request',
      { email }
    );
  }
  public resetPassword(password: string, passwordToken: string) {
    return this.httpClient.post<any>(
      this.API + '/authProvider/reset-password',
      {
        password,
        passwordToken,
      }
    );
  }
  updateUser(provider: Provider) {
    return this.httpClient
      .put<any>(`${this.API}/authProvider/provider/${provider._id}`, provider)
      .pipe(tap((res) => this.setSession(res.data)));
  }
  public logout() {
    localStorage.clear();
  }
  public isAuthenticated() {
    try {
      const token = localStorage.getItem(this.ID_TOKEN);
      return token ? !new JwtHelperService().isTokenExpired(token) : false;
    } catch (e) {
      localStorage.clear();
      return false;
    }
  }
  public getCurrentProvider() {
    const token = localStorage.getItem(this.ID_TOKEN);
    let provider: Provider = new JwtHelperService().decodeToken(token);
    return provider;
  }

  public verifyRestPasswordToken(passwordToken: string) {
    return this.httpClient.get<any>(
      this.API + '/authProvider/verify-password-token/' + passwordToken
    );
  }

  updatePassword(oldPassword: string, newPassword: string) {
    return this.httpClient.put<any>(this.API + '/authProvider/password', {
      oldPassword,
      newPassword,
    });
  }

  private setSession(authResponse) {
    const token = authResponse.token;
    localStorage.setItem(this.ID_TOKEN, token);
    let provider: Provider = new JwtHelperService().decodeToken(token);
    localStorage.setItem('companyName', provider.companyName);
    localStorage.setItem('logo', provider.logo);
  }
}
