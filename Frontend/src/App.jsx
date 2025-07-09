import { useState, useEffect } from "react";
import "prismjs/themes/prism-tomorrow.css";
import Editor from "react-simple-code-editor";
import prism from "prismjs";
import Markdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import axios from "axios";
import "./App.css";

function App() {
  const defaultCode = `function sum() {
  return a + b;
}`;

  const defaultReview = `
## 👋 Welcome to CodeOptima! 🚀  
&nbsp;  

### 🌟 How It Works:  
&nbsp;  
📝 **Write your code** in the left panel.  
&nbsp;  
⚡ **Click "Review"** to analyze your code.  
&nbsp;  
📊 **Get instant feedback** with best practices, optimizations, and improvements.  
&nbsp;  

### 🔥 Features:  
&nbsp;  
✅ Helps you write **cleaner, more efficient code**.  
&nbsp;  
✅ Supports **multiple programming languages** (JavaScript, Python, C++, Java, and more!).  
&nbsp;  

🚀 **Start coding and let AI help you improve! Happy Coding 😊**  
&nbsp;  
`;

  const [code, setCode] = useState(defaultCode);
  const [review, setReview] = useState(defaultReview);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    prism.highlightAll();
  }, [review]);

  async function reviewCode() {
    const apiURL = "https://codeoptima-backend-1wq3.onrender.com/ai/get-review"; // Direct backend URL
    setLoading(true);
    try {
      console.log("Calling API at:", apiURL);
      const response = await axios.post(apiURL, { code });
      console.log("API response:", response.data);
      setReview(response.data.review);
    } catch (error) {
      console.error("Error fetching review:", error);
      setReview("❌ Error fetching review. Please try again later.");
    } finally {
      setLoading(false);
    }
  }

  function resetCode() {
    setCode(defaultCode);
    setReview(defaultReview);
  }

  return (
    <>
      <header className="header">CodeOptima 🚀</header>
      <main>
        <div className="left">
          <div className="code">
            <Editor
              value={code}
              onValueChange={setCode}
              highlight={(code) =>
                prism.highlight(code, prism.languages.javascript, "javascript")
              }
              padding={10}
              className="editor"
            />
          </div>
          <div className="buttons">
            <button onClick={reviewCode} className="review" disabled={loading}>
              {loading ? "Reviewing..." : "Review"}
            </button>
            <button onClick={resetCode} className="reset" disabled={loading}>
              Reset
            </button>
          </div>
        </div>
        <div className="right">
          {loading ? (
            <p>⏳ Reviewing your code, please wait...</p>
          ) : (
            <Markdown rehypePlugins={[rehypeHighlight]}>{review}</Markdown>
          )}
        </div>
      </main>
    </>
  );
}

export default App;
