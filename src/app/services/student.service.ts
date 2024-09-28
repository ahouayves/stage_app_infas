import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://127.0.0.1:8000/api/stage'; // Remplacez par l'URL de votre backend

  constructor(private http: HttpClient) { }

  registerStudent(student: any): Observable<any> {
    return this.http.post(this.apiUrl, {
      matricule: student.matricule,
      detail: student.detail,
      latitude: student.latitude,
      longitude: student.longitude
    });
  }
}
