import React, {useState} from "react"
import emailjs from "emailjs-com"
import { init } from "emailjs-com"
import Layout from "../components/layout"
import Head from "../components/head"
const ID = process.env.USERID
init(ID)

const ContactPage = () => {
  const [sent, setSent] = useState(false)

  function sendEmail(e) {
    e.preventDefault()

    emailjs.sendForm("service_ts0cbib", "template_ymcpv5c", e.target, ID).then(
      result => {
        console.log(result.text)
        setSent(true)
      },
      error => {
        console.log(error.text)
      }
    )
  }

  return (
    <Layout>
      <Head title="Contact" />
      <h1>Get in Touch</h1>
      <div >
        {sent === false ? (
          <>
            <form className="ui big form" onSubmit={sendEmail}>
              <input type="hidden" name="contact_number" />
              <div className="field">
                <label>Name</label>
                <input
                  required
                  type="text"
                  name="user_name"
                  placeholder="First Last"
                />
              </div>
              <div className="field">
                <label>Email</label>
                <input
                  required
                  className="field"
                  type="email"
                  name="user_email"
                  placeholder="email@example.com"
                  style={{ padding: "5px" }}
                />
              </div>
              <div className="field">
                <label>Message</label>

                <textarea
                  required
                  className="field"
                  name="message"
                  placeholder="Write your message here."
                />
              </div>
              <div className="field">
                <input
                  className="ui large basic button teal"
                  type="submit"
                  value="Send"
                />
              </div>
            </form>
          </>
        ) : (
          <div  style={{ margin: "2rem" }}>
            <h3>Thank you!</h3>
            <p>Your message has been sent!</p>
          </div>
        )}
        <a
          href="https://www.linkedin.com/in/rebeccahirai"
          target="_blank"
          rel="noopener noreferrer"
          className="ui basic teal basic large icon button"
        >
          Let's connect on <i className="large linkedin icon"></i>
        </a>
      </div>
    </Layout>
  )
}

export default ContactPage