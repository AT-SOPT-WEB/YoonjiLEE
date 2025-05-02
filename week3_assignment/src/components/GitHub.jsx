import { useState } from "react";

export default function Github() {
  const [input, setInput] = useState("");

  return (
    <main className="max-w-md mx-auto mt-8">
      <section aria-labelledby="github-search-title">
        <h2 id="github-search-title" className="sr-only">
          깃허브 검색
        </h2>
        <form
          className="flex gap-2 mb-4"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="깃허브 아이디 입력"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            aria-label="깃허브 아이디 입력"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
          >
            검색
          </button>
        </form>
      </section>
    </main>
  );
}
