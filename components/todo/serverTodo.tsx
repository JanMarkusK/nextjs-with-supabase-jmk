import { createClient } from "@/utils/supabase/server";
import React from "react";
import { Button } from "../ui/button";
import { revalidatePath } from "next/cache";

export default async function ServerTodo() {
    const supabase = createClient();

    // Fetch todos from the database
    let { data: todos, error } = await supabase
        .from('todos')
        .select('*');

    if (!todos || todos.length === 0) return <h1>No todos found</h1>;

    // Insert a new todo
    const insertTodo = async () => {
        'use server';  // Ensures the action is server-side
        const { data, error } = await supabase
            .from('todos')
            .insert([{ title: 'test', priority: '2' }])
            .select();

        if (!error) {
            revalidatePath("/todo");  // Revalidate to reflect new data
        }
    };

    // Update an existing todo by its ID
    const updateTodo = async (id: number, newTitle: string) => {
        'use server';
        const { data, error } = await supabase
            .from('todos')
            .update({ title: newTitle })
            .eq('id', id);

        if (!error) {
            revalidatePath("/todo");  // Revalidate to reflect updated data
        }
    };

    // Delete a todo by its ID
    const deleteTodo = async (id: number) => {
        'use server';
        const { data, error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id);

        if (!error) {
            revalidatePath("/todo");  // Revalidate to reflect deleted data
        }
    };

    return (
        <>
            <main className="flex-1 flex flex-col gap-6 px-4">
                {/* List of todos */}
                {todos.map((todo) => (
                    <div key={todo.id} className="flex justify-between items-center">
                        <span>{todo.title}</span>
                        <Button onClick={() => updateTodo(todo.id, "Updated Title")}>Update</Button>
                        <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
                    </div>
                ))}
            </main>
            <Button onClick={insertTodo}>Insert todo</Button>
        </>
    );
}