import Body from "./Body"
import Header from "./Header"
export default function Home() {
  return (
    <div className="relative w-[100vw] h-[100vh]">
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
      <Header/>
      <Body/>
    </div>
  )
}