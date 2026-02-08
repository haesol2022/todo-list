"use client";

import { useEffect, useState } from "react";
import { useRouter, useParams } from "next/navigation";
import Image from "next/image";

const BASE_URL = "https://assignment-todolist-api.vercel.app/api";
const TENANT_ID = "haesol";

type Item = {
  id: number;
  name: string;
  memo: string;
  imageUrl: string | null;
  isCompleted: boolean;
};

export default function ItemDetailPage() {
  const router = useRouter();
  const { itemId } = useParams<{ itemId: string }>();

  const [item, setItem] = useState<Item | null>(null);
  const [memo, setMemo] = useState("");
  const [preview, setPreview] = useState<string | null>(null);

  useEffect(() => {
    fetch(`${BASE_URL}/${TENANT_ID}/items/${itemId}`)
      .then(res => res.json())
      .then((data: Item) => {
        setItem(data);
        setMemo(data.memo ?? "");
        setPreview(data.imageUrl);
      });
  }, [itemId]);

  const handleImageUpload = async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch(
      `${BASE_URL}/${TENANT_ID}/images/upload`,
      { method: "POST", body: formData }
    );

    const data = await res.json();
    setPreview(data.imageUrl ?? data.url);
  };

  const handlePatch = async () => {
    if (!item) return;

    await fetch(
      `${BASE_URL}/${TENANT_ID}/items/${item.id}`,
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: item.name,
          memo,
          imageUrl: preview,
          isCompleted: item.isCompleted,
        }),
      }
    );

    router.push("/");
  };

  const handleDelete = async () => {
    if (!confirm("정말 삭제할까요?")) return;

    await fetch(
      `${BASE_URL}/${TENANT_ID}/items/${itemId}`,
      { method: "DELETE" }
    );

    router.push("/");
  };

  if (!item) return null;

  const isDone = item.isCompleted;
  const CONTENT_WIDTH = "max-w-[920px]";

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200">
        <div className="h-16 flex items-center mx-auto max-w-[1200px] px-4 lg:px-16">
          <button onClick={() => (window.location.href = "/")}>
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

      <main className="mx-auto px-4 py-10">
        {/* BAR */}
        <div className={`relative w-full ${CONTENT_WIDTH} h-[72px] mb-6 mx-auto`}>
          <Image
            src={isDone ? "/done_bar.svg" : "/todo_bar.svg"}
            alt="bar"
            fill
            className="pointer-events-none"
          />
          <div className="relative z-10 flex items-center justify-center h-full gap-4">
            <Image
              src={isDone ? "/done_check.svg" : "/todo_check.svg"}
              alt="check"
              width={24}
              height={24}
            />
            <span className="font-semibold underline text-slate-800 text-lg">
              {item.name}
            </span>
          </div>
        </div>

        {/* IMAGE + MEMO */}
        <div
          className={`
            ${CONTENT_WIDTH}
            mx-auto
            flex
            flex-col
            lg:flex-row
            justify-between

            gap-3
            md:gap-6
            lg:gap-8

            -mt-10
          `}
        >
          {/* IMAGE */}
          <div
            className="
              relative
              w-full
              lg:w-[360px]
              h-[320px]
              overflow-hidden
              rounded-2xl
              mt-10
            "
          >
            <Image
              src={preview ?? "/image.svg"}
              alt="image"
              fill
              className="object-cover pointer-events-none"
            />

            <label className="absolute bottom-4 right-8 cursor-pointer z-10">
              <Image
                src={isDone ? "/image_patch_btn.svg" : "/image_add_btn.svg"}
                alt="image-btn"
                width={55}
                height={55}
              />
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={e =>
                  e.target.files && handleImageUpload(e.target.files[0])
                }
              />
            </label>
          </div>

          {/* MEMO */}
          <div
            className="
              relative
              w-full
              lg:w-[520px]
              h-[600px]
              md:h-[520px]
              lg:h-[480px]
              lg:-mt-10
            "
          >
            <Image
              src="/memo.svg"
              alt="memo"
              fill
              className="pointer-events-none"
            />
            <div className="absolute inset-0 z-10 flex flex-col items-center pt-24 px-10">
              <span className="text-amber-800 font-semibold mb-12 text-lg">
                Memo
              </span>
              <textarea
                value={memo}
                onChange={e => setMemo(e.target.value)}
                placeholder="메모를 입력하세요"
                className="
                  w-full h-full
                  bg-transparent resize-none
                  outline-none
                  text-center
                  leading-relaxed
                  text-slate-800
                "
              />
            </div>
          </div>
        </div>

        {/* BUTTONS */}
        <div
          className={`
            ${CONTENT_WIDTH}
            mx-auto
            flex
            gap-4
            relative
            z-20

            justify-center
            -mt-36

            md:mb-20
            lg:justify-end
            lg:-mt-12
          `}
        >
          <Image
            src={isDone ? "/patch_done_btn.svg" : "/patch_btn.svg"}
            alt="patch"
            width={150}
            height={48}
            className="cursor-pointer"
            onClick={handlePatch}
          />

          <Image
            src="/delete_btn.svg"
            alt="delete"
            width={150}
            height={48}
            className="cursor-pointer"
            onClick={handleDelete}
          />
        </div>
      </main>
    </div>
  );
}
