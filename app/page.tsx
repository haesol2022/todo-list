"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const BASE_URL = "https://assignment-todolist-api.vercel.app/api";
const TENANT_ID = "haesol";

type Item = {
  id: number;
  name: string;
  isCompleted: boolean;
};

export default function Home() {
  const router = useRouter();
  const [input, setInput] = useState("");
  const [items, setItems] = useState<Item[]>([]);

  /* =====================
     GET items
  ===================== */
  const fetchItems = async () => {
    const res = await fetch(`${BASE_URL}/${TENANT_ID}/items`);
    const data = await res.json();
    setItems(data);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  /* =====================
     POST
  ===================== */
  const addTodo = async () => {
    if (!input.trim()) return;

    await fetch(`${BASE_URL}/${TENANT_ID}/items`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: input }),
    });

    setInput("");
    fetchItems();
  };

  /* =====================
     PATCH (완료/취소)
  ===================== */
  const toggleDone = async (item: Item) => {
    await fetch(
      `${BASE_URL}/${TENANT_ID}/items/${item.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: item.name,
          isCompleted: !item.isCompleted,
        }),
      }
    );
  
    fetchItems();
  };
  

  const todos = items.filter(i => !i.isCompleted);
  const dones = items.filter(i => i.isCompleted);

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200">
  <div className="h-16 flex items-center mx-auto max-w-[1200px] px-4 lg:px-16">
    <button
      type="button"
      onClick={() => {
        window.location.href = "/";
      }}
      className="cursor-pointer"
    >
      <Image
        src="/logo_large.svg"
        alt="logo"
        width={151}
        height={40}
        className="hidden md:block"
      />
      <Image
        src="/logo_small.svg"
        alt="logo"
        width={71}
        height={40}
        className="md:hidden"
      />
    </button>
  </div>
</header>


      <main className="px-4 md:px-8 lg:px-16 py-12 max-w-[1200px] mx-auto">
        {/* INPUT */}
        <section className="flex items-center gap-4">
          <div className="relative flex-1 min-h-[56px]">
            <Image src="/search.svg" alt="search" fill />
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === "Enter" && addTodo()}
              placeholder="할 일을 입력하세요"
              className="absolute inset-y-0 left-4 w-[calc(100%-32px)] bg-transparent outline-none"
            />
          </div>

          <Image src="/add.png" alt="add" width={168} height={56} onClick={addTodo} className="hidden md:block cursor-pointer" />
          <Image src="/add_small.png" alt="add" width={56} height={56} onClick={addTodo} className="md:hidden cursor-pointer" />
        </section>

        {/* TODO / DONE */}
        <section className="mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* TODO */}
          <div>
            <Image src="/todo.svg" alt="todo" width={80} height={24} />
            <div className="mt-4 space-y-3">
            {todos.length === 0 ? (
            <div className="mt-12 flex flex-col items-center gap-3 text-slate-400">
                    <Image
                      src="/todo_empty.svg"
                      alt="empty"
                      width={160}
                      height={160}
                    />
                    <p className="text-slate-400 text-center">
                      할 일이 없어요.<br />
                      TODO를 새롭게 추가해주세요!
                    </p>
                  </div>
                ) : (


                todos.map(item => (
                  <div key={item.id} className="relative h-[72px]">
                    <Image src="/todo_bar.svg" fill alt="bar" />
                    <div
                      className="relative z-10 flex items-center h-full px-4 gap-3 cursor-pointer"
                      onClick={() => router.push(`/items/${item.id}`)}
                    >
                      <button
                        onClick={e => {
                          e.stopPropagation();
                          toggleDone(item);
                        }}
                      >
                        <Image src="/todo_check.svg" alt="check" width={24} height={24} />
                      </button>
                      <span>{item.name}</span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* DONE */}
          <div>
            <Image src="/done.svg" alt="done" width={80} height={24} />
            <div className="mt-4 space-y-3">
            {dones.length === 0 ? (
              <div className="mt-12 flex flex-col items-center gap-3 text-slate-400">
                <Image
                  src="/done_empty.svg"
                  alt="empty"
                  width={160}
                  height={160}
                />
                <p className="text-slate-400 text-center">
                  아직 다 한 일이 없어요.<br />
                  해야 할 일을 체크해보세요!
                </p>
              </div>
            ) : (
              dones.map(item => (
                <div key={item.id} className="relative h-[72px]">
                  <Image src="/done_bar.svg" fill alt="bar" />
                  <div
                    className="relative z-10 flex items-center h-full px-4 gap-3 cursor-pointer"
                    onClick={() => router.push(`/items/${item.id}`)}
                  >
                    <button
                      onClick={e => {
                        e.stopPropagation();
                        toggleDone(item);
                      }}
                    >
                      <Image
                        src="/done_check.svg"
                        alt="check"
                        width={24}
                        height={24}
                      />
                    </button>
              
                    <span className="line-through">{item.name}</span>
                  </div>
                </div>
              ))
              
              )}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
