import { Component, OnInit } from '@angular/core';
import { AlunosService } from './services/alunos.service';
import { Alunos } from './models/alunos';
import { NgForm } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'blabla';
  public id: number;
  nome: Alunos[];

  alunosO = Observable;

  pesquisarAluno() {
    console.log(this.id);
  }

  aluno = {} as Alunos;
  alunos: Alunos[];

  constructor(private service: AlunosService) {}

  ngOnInit() {
    this.getAlunos();
  }

  // GET alunos
  getAlunos() {
    this.service.getAlunos().subscribe((alunos: Alunos[]) => {
      this.alunos = alunos;
    });
  }
  getAlunosById(id: number) {
    this.service.getAlunosById(id).subscribe(() => {
      this.getAlunos();
    });
  }

  //GET POR NOME
  getAlunosByNome(nome: string) {
    if (this.aluno.nome === undefined) {
      alert('Digite o Aluno Por Favor');
    } else {
      this.service.getAlunoByNome(nome).subscribe((data) => {
        this.nome = data;
      });
    }
  }

  //DELETE Alunos
  deleteAlunos(aluno: Alunos) {
    if (
      confirm(
        'Você tem certeza da sua Decisão? O aluno a seguir será DELETADO do sistema.'
      )
    ) {
      this.service.deleteAluno(aluno).subscribe(() => {
        this.getAlunos();
      });
    }
  }

  //Editar aluno
  editAluno(aluno: Alunos) {
    this.aluno = { ...aluno };
  }

  //Criar aluno
  postAluno(aluno: Alunos) {
    let comparacao = Object.keys(aluno).length;
    if (comparacao == 0) {
      alert(
        'Por Favor insira as informaçoes necessarias nos campos abaixo: NOME do Aluno e EMAIL do Aluno'
      );
    } else if (aluno.nome === undefined || aluno.nome == 'undefined') {
      alert('Por favor Insira o Nome do Aluno');
    } else if (aluno.email == undefined || aluno.email == 'undefined') {
      alert('Por favor Insira o Email do Aluno');
    } else {
      this.service.postAluno(aluno).subscribe(() => {
        this.getAlunos();
      });
    }
  }

  updateAluno(aluno: Alunos) {
    let comparacao = Object.keys(aluno).length;
    if (comparacao == 0) {
      alert('É necessario o prenchimento do campo Matricula.');
    } else if (aluno.nome == undefined || aluno.nome == null) {
      alert('Nome para alteração é necessario');
    } else if (aluno.email == undefined || aluno.email == 'undefined') {
      alert('Email é nessario para alteração');
    } else {
      this.service.updateAluno(aluno.id, aluno).subscribe(() => {
        this.getAlunos();
        alert('Aluno Atualizado com Sucesso');
      });
    }
  }

  // limpar form
  cleanForm(form: NgForm) {
    this.getAlunos();
    form.resetForm();
    this.aluno = {} as Alunos;
  }
}
