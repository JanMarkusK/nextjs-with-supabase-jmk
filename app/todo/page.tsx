import ClientTodo from "../../components/todo/clientTodo"
import ServerTodo from "../../components/todo/serverTodo"
export default async function Index() {
  return (
    <>
      <ClientTodo/>
      <ServerTodo/>
    </>
  );
}
