"use client";
import { createClient } from "@/utils/supabase/client";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

//const router = useRouter();
//router.refresh();

export default function ClientTodo() {
    const [todos, setTodos] = useState<any[] | null>([]);
    const [newTodo, setNewTodo] = useState(""); // For new TODO title
    const [newPriority, setNewPriority] = useState("");
    const [updatedTodo, setUpdatedTodo] = useState("");
    const [updatedPriority, setUpdatedPriority] = useState(""); 
    const [editingId, setEditingId] = useState<number | null>(null); 

    const supabase = createClient();

    useEffect(() =>{
        getTodos();
    }, []);

    // Fetch todos from the database
    const getTodos = async () => {
        let { data: todos, error } = await supabase
            .from('todos')
            .select('*');
        setTodos(todos);
    };

    // Insert a new todo
    const insertTodo = async () => {
        const { data, error } = await supabase
            .from('todos')
            .insert([
                { title: newTodo, priority: newPriority }
            ])
            .select();

        if (!error) {
            setNewTodo(""); // Reset input
            setNewPriority("")
            getTodos(); // Refresh the list
        }
    };

    // Update an existing todo
    const updateTodo = async (id: number) => {
        const { data, error } = await supabase
            .from('todos')
            .update({ title: updatedTodo, priority: updatedPriority })
            
            .eq('id', id);

        if (!error) {
            setEditingId(null); // Stop editing mode
            setUpdatedTodo(""); // Reset input
            getTodos(); // Refresh the list
        }
    };

    // Delete a todo
    const deleteTodo = async (id: number) => {
        const { data, error } = await supabase
            .from('todos')
            .delete()
            .eq('id', id);

        if (!error) {
            getTodos(); // Refresh the list
        }
    };

    if (!todos || todos.length === 0) return <h1>No todos found</h1>;

    return (
        <>
            <main className="flex-1 flex flex-col gap-6 px-4">
                {/* List of Todos */}
                <div className="flex flex-1 justify-right gap-10">
                  <span className="max-w-48 min-w-20">Todo Title</span>
                  <span className="max-w-48 min-w-5">Todo Priority</span>
                </div>
                {todos.map((todo) => (
                    <div key={todo.id} className="flex justify-between items-center">
                        {editingId === todo.id ? (
                            // Editing mode
                            <>
                                <input
                                    type="text"
                                    value={updatedTodo}
                                    onChange={(e) => setUpdatedTodo(e.target.value)}
                                    className="border border-gray-400 p-1"
                                />
                                 <input
                                    type="number"
                                    value={updatedPriority}
                                    onChange={(e) => setUpdatedPriority(e.target.value)}
                                    className="border border-gray-400 p-1"
                                />
                                <div className="flex gap-2">
                                    <Button onClick={() => updateTodo(todo.id)}>Update</Button>
                                    <Button onClick={() => setEditingId(null)}>Cancel</Button>
                                </div>
                            </>
                        ) : (
                            // Normal mode
                           <>
                                 <div className="flex flex-1 justify-right gap-10">
                                    <span className="max-w-48 min-w-20">{todo.title}</span>
                                    <span className="max-w-48 min-w-5">{todo.priority}</span>
                                 </div>
                                 <div className="flex gap-2">
                                    <Button onClick={() => setEditingId(todo.id)}>Edit</Button>
                                    <Button onClick={() => deleteTodo(todo.id)}>Delete</Button>
                                 </div>
                           </>
                        )}
                    </div>
                ))}

                {/* Input for new TODO */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        placeholder="New TODO"
                        className="border border-gray-400 p-1"
                    />
                     <input
                        type="number"
                        value={newPriority}
                        onChange={(e) => setNewPriority(e.target.value)}
                        placeholder="New Priority"
                        className="border border-gray-400 p-1"
                    />
                    <Button onClick={insertTodo}>Insert todo</Button>
                </div>
            </main>
        </>
    );
}