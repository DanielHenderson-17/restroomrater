import { useState } from "react"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom"
import "./Login.css"
import { getUserByEmail } from "../../services/userService"

export const Login = () => {
  const [email, set] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0]
        localStorage.setItem(
          "rr_user",
          JSON.stringify({
            id: user.id,
            email: user.email,
            name: user.name,
            imgUrl: user.imgUrl,
            totalRatings: user.imgUrl,
            averageRatings: user.averageRatings
          })
        )

        navigate("/")
      } else {
        window.alert("Invalid login")
      }
    })
  }

  return (
    <main className="container-login mt-5 pt-5">
      <section className="row mt-5">
        <form className="form-login card w-25" onSubmit={handleLogin}>
          <h2 className="mt-5">Please sign in</h2>
          <fieldset>
            <div className="form-group p-5">
              <input
                type="email"
                value={email}
                onChange={(evt) => set(evt.target.value)}
                className="form-control border"
                placeholder="Email address"
                required
                autoFocus
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn btn btn-info" type="submit">
                Sign in
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section>
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}
