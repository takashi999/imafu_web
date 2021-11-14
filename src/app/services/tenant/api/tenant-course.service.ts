import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class TenantCourseService {

  constructor(
    private httpClient: HttpClient,
  ) {
  }

  list() {
    return this.httpClient.get<any[]>(`@te/courses`);
  }

  create(body: any) {
    return this.httpClient.post(`@te/courses`, body);
  }

  get(tenantCourseId: number) {
    return this.httpClient.get(`@te/courses/${ tenantCourseId }`);
  }

  modify(tenantCourseId: number, body: any) {
    return this.httpClient.patch(`@te/courses/${ tenantCourseId }`, body);
  }

  delete(tenantCourseId: number) {
    return this.httpClient.delete(`@te/courses/${ tenantCourseId }`);
  }

  changeSort(body: any) {
    return this.httpClient.patch(`@te/courses-sort`, body);
  }
}
