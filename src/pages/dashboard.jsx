import { useState } from "react"
import { signOut } from "firebase/auth"
import { auth } from "../services/firebase"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import "../Dashboard.css"

export default function Dashboard() {
  const { user } = useAuth()
  const navigate = useNavigate()
  const [text, setText] = useState("")
  const [summary, setSummary] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSummarize = async () => {
    if (!text.trim()) return
    setLoading(true)
    try {
      setSummary("Summary will appear here once you connect an AI API.")
    } catch (error) {
      console.error(error.message)
    } finally {
      setLoading(false)
    }
  }

  const handleLogout = async () => {
    await signOut(auth)
    navigate("/login")
  }

  return (
    <div className="dashboard">
      <nav className="dashboard__nav">
        <span className="dashboard__brand">AI Summarizer</span>
        <div className="dashboard__account">
          <span className="dashboard__email">{user?.email}</span>
          <button className="dashboard__logout" onClick={handleLogout}>Logout</button>
        </div>
      </nav>

      <main className="dashboard__main">
        <h2>Summarize Text</h2>
        <p className="dashboard__hint">Paste your text below and click Summarize.</p>
        <textarea
          rows="10"
          placeholder="Paste your text here..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          className="dashboard__summarize"
          onClick={handleSummarize}
          disabled={loading}
        >
          {loading ? "Summarizing..." : "Summarize"}
        </button>

        {summary && (
          <div className="dashboard__result">
            <h3>Summary</h3>
            <p>{summary}</p>
          </div>
        )}
      </main>
    </div>
  )
}