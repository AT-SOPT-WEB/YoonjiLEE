import { useState, useRef, useEffect } from "react";

function getRandomAnswer() {
  let nums = [];
  while (nums.length < 3) {
    const n = Math.floor(Math.random() * 10);
    if (!nums.includes(n)) nums.push(n);
  }
  return nums.join("");
}

export default function BaseballGame() {
  const [answer, setAnswer] = useState(getRandomAnswer());
  const [input, setInput] = useState("");
  const [message, setMessage] = useState("");
  const [history, setHistory] = useState([]);
  const [count, setCount] = useState(0);
  const [status, setStatus] = useState("playing");
  const timerRef = useRef();

  const resetGame = () => {
    setAnswer(getRandomAnswer());
    setInput("");
    setMessage("");
    setHistory([]);
    setCount(0);
    setStatus("playing");
  };

  useEffect(() => {
    if (status === "win") {
      setMessage("🎉 정답! 3초 후 게임이 초기화됩니다.");
      timerRef.current = setTimeout(resetGame, 3000);
    }
    if (status === "lose") {
      setMessage(
        `😢 10회 실패! 정답은 ${answer}입니다. 5초 후 게임이 초기화됩니다.`
      );
      timerRef.current = setTimeout(resetGame, 5000);
    }
    return () => clearTimeout(timerRef.current);
  }, [answer, status]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{3}$/.test(input)) {
      setMessage("⚠️ 3자리 숫자만 입력하세요.");
      return;
    }
    if (new Set(input).size !== 3) {
      setMessage("⚠️ 중복 없는 3자리 숫자만 입력하세요.");
      return;
    }
    if (status !== "playing") return;

    let strike = 0,
      ball = 0;
    for (let i = 0; i < 3; i++) {
      if (input[i] === answer[i]) strike++;
      else if (answer.includes(input[i])) ball++;
    }
    const result = `${input} - ${strike}스트라이크 ${ball}볼`;
    setHistory((prev) => [...prev, result]);
    setCount((c) => c + 1);

    if (strike === 3) {
      setStatus("win");
    } else if (count + 1 >= 10) {
      setStatus("lose");
    } else {
      setMessage(result);
    }
    setInput("");
  };

  return (
    <main className="max-w-md mx-auto mt-8">
      <section aria-labelledby="baseball-game-title">
        <h2 id="baseball-game-title" className="sr-only">
          숫자야구 게임
        </h2>
        <form className="flex gap-2 mb-4" onSubmit={handleSubmit}>
          <input
            className="flex-1 border rounded px-3 py-2"
            placeholder="3자리 숫자"
            value={input}
            maxLength={3}
            onChange={(e) => setInput(e.target.value.replace(/[^0-9]/g, ""))}
            disabled={status !== "playing"}
            aria-label="3자리 숫자 입력"
          />
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            type="submit"
            disabled={status !== "playing"}
          >
            입력
          </button>
        </form>
        <p className="mb-2 text-center" aria-live="polite">
          {message}
        </p>
        <p className="mb-2 text-center text-gray-500">시도: {count} / 10</p>
        <ul
          className="bg-white rounded shadow p-4 min-h-[60px]"
          aria-label="이전 시도 결과"
        >
          {history.map((h, i) => (
            <li key={i} className="mb-1">
              {h}
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
