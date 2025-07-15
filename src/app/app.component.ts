import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

export interface Todo {
  id: number;
  title: string;
  done: boolean;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'todo-app';

  public textoDaNovaTarefa: string = '';

  public listaDeTarefas: Todo[] = [];

  private proximoId: number = 1;

  constructor() {
    this.carregarTarefasDoLocalStorage();
  }

  adicionarTarefa() {
    const textoLimpo = this.textoDaNovaTarefa.trim();

    if (textoLimpo === '') {
      return;
    }

    const novaTarefa: Todo = {
      id: this.proximoId,
      title: textoLimpo,
      done: false,
    };

    this.listaDeTarefas.push(novaTarefa);

    this.proximoId++;

    this.textoDaNovaTarefa = '';

    this.salvarTarefasNoLocalStorage();
  }

  alternarStatusDaTarefa(tarefaClicada: Todo) {
    tarefaClicada.done = !tarefaClicada.done;

    this.salvarTarefasNoLocalStorage();
  }

  removerTarefa(tarefaParaRemover: Todo) {
    this.listaDeTarefas = this.listaDeTarefas.filter(
      (tarefa) => tarefa.id !== tarefaParaRemover.id
    );

    this.salvarTarefasNoLocalStorage();
  }

  private salvarTarefasNoLocalStorage() {
    localStorage.setItem('minhas-tarefas', JSON.stringify(this.listaDeTarefas));
  }

  private carregarTarefasDoLocalStorage() {
    const tarefasSalvasComoTexto = localStorage.getItem('minhas-tarefas');

    if (tarefasSalvasComoTexto) {
      const tarefasSalvas = JSON.parse(tarefasSalvasComoTexto);
      this.listaDeTarefas = tarefasSalvas;

      let maiorId = 0;
      for (const tarefa of this.listaDeTarefas) {
        if (tarefa.id > maiorId) {
          maiorId = tarefa.id;
        }
      }

      this.proximoId = maiorId + 1;
    }
  }
}
