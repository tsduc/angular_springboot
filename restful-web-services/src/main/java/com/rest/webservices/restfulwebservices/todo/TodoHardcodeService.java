package com.rest.webservices.restfulwebservices.todo;

import org.springframework.stereotype.Component;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class TodoHardcodeService {

    private static List<Todo> todos = new ArrayList<>();
    private static int idCounter = 0;

    static {
        todos.add(new Todo(++idCounter, "dunv", "Learn to Dance 2", new Date(), false));
        todos.add(new Todo(++idCounter, "dunv", "Learn about MicroServices 2", new Date(), false));
        todos.add(new Todo(++idCounter, "dunv", "Learn about Angular", new Date(), false));
    }

    public List<Todo> findAll(){
        return todos;
    }

    public Todo save(Todo todo){
        if (todo.getId() == -1){
            todo.setId(++idCounter);
            todos.add(todo);
        } else {
            deleteById(todo.getId());
            todos.add(todo);
        }
        return todo;
    }

    public Todo deleteById(int id){
        Todo todo = findById(id);
        if (todo == null) return null;
        if (todos.remove(todo)){
            return todo;
        }
        return null;
    }

    public Todo findById(int id) {
        for (Todo todo: todos){
            if (todo.getId() == id){
                return todo;
            }
        }
        return null;
    }

}

