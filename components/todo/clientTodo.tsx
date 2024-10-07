"use client"
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

//const router = useRouter();

//router.refresh();

export default function ClientTodo() {
    const [todos, setTodos] = useState<any[] | null>([]);
    const supabase = createClient();

    useEffect(() =>{
        getTodos();
    }, []);

    const getTodos = async() =>{
        let { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        setTodos(todos);
    };

    const insertTodo = async() =>{
        const { data, error } = await supabase
        .from('todos')
        .insert([
          { title: 'test', priority: '2'  }
        ])
        .select() 
        
        if (!error) {
            getTodos();     
    }};
           
    if (!todos || todos.length === 0) return <h1>No todos found</h1>;
    
  return (
    <>
        <main className="flex-1 flex flex-col gap-6 px-4">{JSON.stringify(todos)}</main>
        <Button onClick={insertTodo}>Insert todo</Button>
    </>
  );
}
