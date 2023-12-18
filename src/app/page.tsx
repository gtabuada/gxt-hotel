"use client";
import { signIn } from "next-auth/react";
import { api } from "~/trpc/react";

export default function Home() {
  const { data } = api.user.getAll.useQuery();
  return (
    <main>
      <h1>hello</h1>

      {data && (
        <ul>
          {data.map((user) => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      )}

      <button onClick={() => signIn("google", { callbackUrl: "/" })}>
        login
      </button>
    </main>
  );
}
