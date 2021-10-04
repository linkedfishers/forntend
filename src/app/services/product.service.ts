import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly API: string = environment.apiUrl + '/products';

  constructor(
    private httpClient: HttpClient,
    private authService: AuthService
  ) {}
  createProduct(formData: FormData) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + this.authService.isAuthenticated(),
    });
    return this.httpClient.post<any>(`${this.API}/product/new`, formData, {
      headers: headers,
    });
  }
  getProductByProvider(providerId: string) {
    return this.httpClient.get<any>(`${this.API}/provider/${providerId}`);
  }
  updateProduct(formData: FormData, id: string) {
    return this.httpClient.put<any>(`${this.API}/product/${id}`, formData);
  }
  searchProduct(keyword: string) {
    return this.httpClient.get<any>(`${this.API}/product/search/${keyword}`);
  }
  getProductCategories() {
    return this.httpClient.get<any>(`${this.API}/categories`);
  }
  getProductsByCategorieAndProvider(catId: string, providerId: string) {
    return this.httpClient.get<any>(
      `${this.API}/categorie/${catId}/providerr/${providerId}`
    );
  }
  getProducts(numberOfResult: number = 3) {
    return this.httpClient.get<any>(`${this.API}/all/`, {
      params: {
        limit: numberOfResult.toString(),
      },
    });
  }

  deleteProduct(id: string) {
    return this.httpClient.delete<any>(`${this.API}/product/${id}`);
  }

  getProduct(id: string) {
    return this.httpClient.get<any>(`${this.API}/product/${id}`);
  }

  getCategories() {
    return this.httpClient.get<any>(`${this.API}/categories`);
  }

  getProduc(numberOfResult: number = 2) {
    return this.httpClient.get<any>(`${this.API}/all`, {
      params: {
        limit: numberOfResult.toString(),
      },
    });
  }
}
export default ProductService;
