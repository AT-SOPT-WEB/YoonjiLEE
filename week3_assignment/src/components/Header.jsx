export default function Header({ tab, setTab }) {
  return (
    <header className="fixed top-0 left-0 w-full flex flex-col items-center justify-center py-6 bg-gray-100 shadow z-10">
      <h1 className="text-2xl font-bold mb-4">
        ⚾️숫자 야구 || 깃허브 검색 🙈
      </h1>
      <div className="flex gap-4">
        <button
          className={`px-4 py-2 rounded transition
            ${
              tab === "github"
                ? "bg-blue-500 text-white hover:bg-gray-400"
                : "bg-white border text-blue-500 hover:bg-gray-200"
            }`}
          onClick={() => setTab("github")}
        >
          깃허브 검색 🔎
        </button>
        <button
          className={`px-4 py-2 rounded transition
            ${
              tab === "baseball"
                ? "bg-blue-500 text-white hover:bg-gray-400"
                : "bg-white border text-blue-500 hover:bg-gray-200"
            }`}
          onClick={() => setTab("baseball")}
        >
          숫자야구 게임 ⚾️
        </button>
      </div>
    </header>
  );
}
