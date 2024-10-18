import { createClient } from "@/utils/supabase/server";
import React from "react";
import { Button } from "../ui/button";
import { revalidatePath } from "next/cache";
revalidatePath("/todo");
export default async function ServerTodo() {
  const supabase = createClient();
  let { data: todos, error } = await supabase.from("todos").select("*");

  if (!todos || todos.length === 0) return <h1>No todos found</h1>;

  const insertTodo = async () => {
    "use server";
    const { data, error } = await supabase
      .from("todos")
      .insert([{ title: "test" }, { priority: "2" }])
      .select();
  };
  const updateTodo = async (id: number) => {
    "use server";
    const { data, error } = await supabase
      .from("todos")
      .update([{ title: "testUpdate" }, { priority: "3" }])
      .eq('id', id);
      .select();
  };
  const deleteTodo = async (id: number) => {
    "use server";
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .eq('id', id);
  };
  return (
    <>
      <main className="flex-1 flex flex-col gap-6 px-4">
        {JSON.stringify(todos)}
      </main>
      <Button onClick={insertTodo}>Insert todo</Button>
    </>
  );
}
