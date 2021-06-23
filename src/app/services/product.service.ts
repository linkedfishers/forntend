import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  readonly API: string = environment.apiUrl + '/products';

  constructor(private httpClient: HttpClient) {}
  createProduct(formData: FormData) {
    return this.httpClient.post<any>(`${this.API}/product/new`, formData);
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
  getProducts() {
    return this.httpClient.get<any>(`${this.API}/all/`);
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
}
export default ProductService;
