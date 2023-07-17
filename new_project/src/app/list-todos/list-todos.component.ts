import { Component, OnInit } from '@angular/core';
import { TodoDataService } from '../service/data/todo-data.service';
import { Route, Router } from '@angular/router';

export class Todo{
  constructor(
    public id: number,
    public description: string,
    public done: boolean,
    public targetDate: Date 
  ){

  }
}

@Component({
  selector: 'app-list-todos',
  templateUrl: './list-todos.component.html',
  styleUrls: ['./list-todos.component.css']
})
export class ListTodosComponent implements OnInit {

  todos!: Todo[];
  message!: string
  // [
  //   new Todo(1, 'learn to Dance', false, new Date()),
  //   new Todo(2, 'Become an Expert at Angular', false, new Date()),
  //   new Todo(3, 'Visit India', false, new Date())

  //   // {id : 1, description: 'learn to Dance'},
  //   // {id : 2, description: 'Become an Expert at Angular'},
  //   // {id : 3, description: 'Visit India'},
  // ]


  constructor(
    private todoService:TodoDataService,
    private router:Router
  ){}

  ngOnInit() {
    this.refreshTodos();
  }

  refreshTodos(){
    this.todoService.retrieveAllTodos('ducnv').subscribe(
      response => {
        console.log(response);
        this.todos = response;
      }
    )
  }

  deleteTodo(id: number){
    console.log(`delete todo ${id}`);
    this.todoService.deleteTodo('ducnv', id).subscribe(
      response => {
        console.log(response);
        this.message = `Delete of Todo ${id} Success`;
        this.refreshTodos();
      }
    )
  }

  updateTodo(id: number){
    this.router.navigate(['todos', id])
  }

  addTodo(){
    this.router.navigate(['todos', -1])
  }

}
