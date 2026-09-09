import { useState } from "react";

const PerfumeFinder = () => {
    const [messages, setMessages] = useState([
        { role: "bot", text: "Hi! Tell me what kind of scent you're looking for and I'll suggest a perfume." }
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSend = async () => {
        if (!input.trim()) return;

        const newMessages = [...messages, { role: "user", text: input }];
        setMessages(newMessages);
        setLoading(true);

        try {
            const response = await fetch("/api/perfumes?limit=100&sortBy=rating");
            if (!response.ok) throw new Error("Unable to fetch perfumes");

            const { perfumes } = await response.json();
            const searchText = input.toLowerCase();
            const matches = perfumes.filter((perfume) => {
                const searchableText = [
                    perfume.name,
                    perfume.brand,
                    perfume.category,
                    perfume.description,
                    ...(perfume.notes || [])
                ].join(" ").toLowerCase();
                return searchText.split(/\s+/).some((word) => word.length > 2 && searchableText.includes(word));
            }).slice(0, 3);

            const reply = matches.length > 0
                ? `These scents match your description: ${matches.map(perfume => `${perfume.name} by ${perfume.brand}`).join(", ")}.`
                : "I could not find an exact match. Try describing your ideal scent with words like floral, woody, fresh, or sweet.";

            setMessages([...newMessages, { role: "bot", text: reply }]);
        } catch {
            setMessages([...newMessages, {
                role: "bot",
                text: "I could not reach the perfume catalog right now. Please try again in a moment."
            }]);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10 bg-white shadow-xl rounded-xl p-6 space-y-4">
            <h2 className="text-2xl font-semibold text-center">🧠 Perfume Chatbot</h2>

            <div className="h-64 overflow-y-auto border p-3 rounded bg-gray-50 space-y-2">
                {messages.map((msg, i) => (
                    <div
                        key={i}
                        className={`text-sm p-2 rounded ${msg.role === "bot" ? "bg-blue-100" : "bg-green-100 text-right"
                            }`}
                    >
                        {msg.text}
                    </div>
                ))}
                {loading && <div className="text-sm text-gray-500">Thinking...</div>}
            </div>

            <div className="flex gap-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === "Enter" && handleSend()}
                    placeholder="Describe your ideal scent..."
                    className="flex-1 border rounded px-3 py-2"
                />
                <button
                    onClick={handleSend}
                    className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default PerfumeFinder;