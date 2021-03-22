import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Alunos } from '../models/alunos';

@Injectable({
  providedIn: 'root',
})
export class AlunosService {
  url = 'http://localhost:3000/Alunos'; // api json-server
  urlNome = 'http://localhost:3000/Alunos/?nome='; // APi json-server para busca de nome

  arrayAlunos: Array<any> = [];

  // injetando o HttpClient
  constructor(private http: HttpClient) {}

  // Headers importante para requisição.
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };

  //Obter todos os Alunos
  getAlunos(): Observable<Alunos[]> {
    //Observable
    return this.http
      .get<Alunos[]>(this.url) // GET da Api
      .pipe(
        retry(2),
        catchError(this.handleError) // Tenta 2 vezes antes do erro;
      );
  }

  //Obter Aluno por iD
  getAlunosById(id: number): Observable<Alunos> {
    return this.http.get<Alunos>(this.url + '/' + id).pipe(
      // Get por ID
      retry(2),
      catchError(this.handleError) // Tenta 2 vezes antes do erro;
    );
  }

  getAlunoByNome(nome): Observable<Alunos[]> {
    let params1 = new HttpParams().set('nome', nome); //Setar parametro de busca.
    return this.http
      .get<Alunos[]>(this.urlNome, { params: params1 }) //Get por nome passando a urlNome setado no inicio e os Params
      .pipe(
        retry(2),
        catchError(this.handleError) // Tenta 2 vezes antes do erro;
      );
  }

  //Gravar Aluno

  postAluno(aluno: Alunos): Observable<Alunos> {
    return this.http
      .post<Alunos>(this.url, JSON.stringify(aluno), this.httpOptions) // Post de um Aluno novo.
      .pipe(
        retry(2),
        catchError(this.handleError) // Tenta 2 vezes antes do erro;
      );
  }

  //editar Aluno

  updateAluno(id, aluno: Alunos): Observable<Alunos> {
    return this.http
      .put<Alunos>(this.url + '/' + id, JSON.stringify(aluno), this.httpOptions) // Put de Aluno existente.
      .pipe(
        retry(1),
        catchError(this.handleError) // Tenta 2 vezes antes do erro;
      );
  }

  //deletar Aluno

  deleteAluno(aluno: Alunos) {
    return this.http
      .delete<Alunos>(this.url + '/' + aluno.id, this.httpOptions) // Delete de um Aluno
      .pipe(
        retry(1),
        catchError(this.handleError) // Tenta 2 vezes antes do erro;
      );
  }

  // Manipulação de erros
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // Error do client
      errorMessage = error.error.message;
    } else {
      // Error do server
      errorMessage =
        `Código do erro: ${error.status}, ` + `menssagem: ${error.message}`;
    }
    return throwError(errorMessage);
  }
}
