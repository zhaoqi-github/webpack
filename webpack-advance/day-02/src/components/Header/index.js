import '@/css/index.scss';

const Header = () => {
  const body = document.body
  const div = document.createElement("div")
  div.setAttribute("class","cengfan")
  div.innerHTML = "<h2>我来组成头部</h2>"
  body.append(div)
}

export default Header