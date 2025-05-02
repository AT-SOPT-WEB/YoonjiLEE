import { useState, useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function Github() {
  const [input, setInput] = useState("");
  const [userInfo, setUserInfo] = useState({ status: "idle", data: null });
  const [recent, setRecent] = useState(() =>
    JSON.parse(localStorage.getItem("recentGithub") || "[]")
  );

  useEffect(() => {
    localStorage.setItem("recentGithub", JSON.stringify(recent));
  }, [recent]);

  const getUserInfo = async (user) => {
    setUserInfo({ status: "pending", data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error("Network response was not ok");
      const data = await response.json();
      setUserInfo({ status: "resolved", data });
      setRecent((prev) => {
        const filtered = prev.filter((id) => id !== user);
        const next = [...filtered, user].slice(-3);
        return next;
      });
    } catch {
      setUserInfo({ status: "rejected", data: null });
    }
  };

  const handleRecentClick = (id) => {
    setInput(id);
    getUserInfo(id);
  };

  const handleRecentDelete = (id) => {
    setRecent((prev) => prev.filter((item) => item !== id));
  };

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
            if (input.trim()) getUserInfo(input.trim());
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
        <nav aria-label="최근 검색어" className="mb-4">
          <ul className="flex gap-2">
            {recent.map((id) => (
              <li
                key={id}
                className="flex items-center bg-gray-200 rounded px-2 py-1"
              >
                <button
                  className="cursor-pointer mr-1"
                  onClick={() => handleRecentClick(id)}
                  aria-label={`${id}로 재검색`}
                >
                  {id}
                </button>
                <button
                  className="text-xs text-red-500"
                  onClick={() => handleRecentDelete(id)}
                  aria-label={`${id} 검색어 삭제`}
                >
                  ×
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {userInfo.status === "pending" && (
          <div className="flex flex-col items-center justify-center py-8">
            <AiOutlineLoading3Quarters className="animate-spin text-blue-500 text-4xl" />
            </div>
        )}
        {userInfo.status === "rejected" && (
          <p className="text-center text-red-500">결과를 찾을 수 없습니다.</p>
        )}
        {userInfo.status === "resolved" && userInfo.data && (
          <article className="bg-white shadow rounded p-4 relative">
            <button
              className="absolute top-2 right-2 text-gray-400"
              onClick={() => setUserInfo({ status: "idle", data: null })}
              aria-label="사용자 정보 닫기"
            >
              ×
            </button>
            <a
              href={userInfo.data.html_url}
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                src={userInfo.data.avatar_url}
                alt="avatar"
                className="w-20 h-20 rounded-full mx-auto cursor-pointer"
              />
            </a>
            <div className="text-center mt-2">
              <a
                href={userInfo.data.html_url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-lg hover:underline"
              >
                {userInfo.data.name || userInfo.data.login}
              </a>
              <div className="text-gray-500">{userInfo.data.login}</div>
              <div className="my-2">{userInfo.data.bio}</div>
              <div className="flex justify-center gap-4 text-sm">
                <span>팔로워: {userInfo.data.followers}</span>
                <span>팔로잉: {userInfo.data.following}</span>
              </div>
            </div>
          </article>
        )}
      </section>
    </main>
  );
}
