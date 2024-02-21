import "./Header.css"
import logoTiko from "../../img/logo_tiko.svg"

export default function Header() {
    return (
        <header className="main-header">
            <img src={logoTiko} alt="Tiko logo" />
            <button className="button-error">Log out</button>
        </header>
    )
}