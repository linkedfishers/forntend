import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Report } from '../interfaces/users.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  readonly API: string = environment.apiUrl;

  constructor(private httpClient: HttpClient) {}
  getweatherData(city: string): Observable<any> {
    return this.httpClient.post<any>(`${this.API}/posts/weather/${city}`, city);
  }

  getForcastweather(city: string) :Observable<any>{
    return this.httpClient.post<any>(
      `${this.API}/posts/weather/forcast/${city}`,
      city
    );
  }

  getPosts() {
    return this.httpClient.get<any>(`${this.API}/posts/all`);
  }

  getFollowingPosts() {
    return this.httpClient.get<any>(`${this.API}/posts/following`);
  }

  createPost(formData: FormData) {
    return this.httpClient.post<any>(`${this.API}/posts/new`, formData, {
      headers: new HttpHeaders({ enctype: 'multipart/form-data' }),
    });
  }

  deletePost(postId: string) {
    return this.httpClient.delete<any>(`${this.API}/posts/post/${postId}`);
  }

  updatePost(formData, id: string) {
    return this.httpClient.put<any>(`${this.API}/posts/post/${id}`, formData);
  }

  reactToPost(postId: string, reactType: string) {
    return this.httpClient.put<any>(`${this.API}/posts/react/${postId}`, {
      reactType,
    });
  }

  getUserPosts(userId: string) {
    return this.httpClient.get<any>(`${this.API}/posts/user-posts/${userId}`);
  }

  addComment(comment: string, post: string) {
    return this.httpClient.post<any>(`${this.API}/posts/comment/new`, {
      content: comment,
      post,
    });
  }

  getComments(postId: string, count: number) {
    return this.httpClient.get<any>(
      `${this.API}/posts/comments/${postId}/${count}`
    );
  }
  deleteComment(commentId: string) {
    return this.httpClient.delete<any>(
      `${this.API}/posts/comment/${commentId}`
    );
  }

  updateComment(formData, id: string) {
    return this.httpClient.put<any>(
      `${this.API}/posts/comment/${id}`,
      formData
    );
  }
  getReports() {
    return this.httpClient.get<any>(`${this.API}/users/reports`);
  }
  createReport(report: Report) {
    return this.httpClient.post<any>(`${this.API}/users/report`, report, {
      headers: new HttpHeaders({ enctype: 'multipart/form-data' }),
    });
  }
}
