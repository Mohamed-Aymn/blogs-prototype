import Footer from "../components/Footer"
import Header from "../components/Header"

function Editor() {
  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <div className="flex-grow">
        Editor
      </div>
      <Footer />
    </div>
  )
}

export default Editor