import { useState } from "react";

const EMPTY = { name: "", email: "", message: "" };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Controlled inputs: the component holds the value, not the DOM.
// This is what buys us live errors and a success message — the two things
// the static HTML+CSS version cannot do without JavaScript.
export default function Contact() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [sent, setSent] = useState("");

  const update = (event) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    const next = {};
    if (!values.name.trim()) next.name = "Please add your name.";
    if (!EMAIL_RE.test(values.email.trim())) next.email = "Please add a valid email address.";
    if (!values.message.trim()) next.message = "Please add a message.";
    return next;
  };

  const onSubmit = (event) => {
    event.preventDefault(); // stop the page reloading
    const found = validate();
    setErrors(found);
    setSent("");

    if (Object.keys(found).length > 0) return;

    setSent(`Thanks ${values.name.trim()} — your message passed validation.`);
    setValues(EMPTY);
  };

  return (
    <section id="contact" className="section">
      <h2>Contact Me</h2>
      <p className="section-sub">
        Fields are validated as you type. Nothing is actually sent yet — there is no backend.
      </p>

      <form className="contact-form" onSubmit={onSubmit} noValidate>
        <label className="sr-only" htmlFor="name">
          Your Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Your Name"
          value={values.name}
          onChange={update}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "name-error" : undefined}
        />
        {errors.name && (
          <p className="field-error" id="name-error">
            {errors.name}
          </p>
        )}

        <label className="sr-only" htmlFor="email">
          Your Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="Your Email"
          value={values.email}
          onChange={update}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "email-error" : undefined}
        />
        {errors.email && (
          <p className="field-error" id="email-error">
            {errors.email}
          </p>
        )}

        <label className="sr-only" htmlFor="message">
          Your Message
        </label>
        <textarea
          id="message"
          name="message"
          rows="5"
          placeholder="Your Message"
          value={values.message}
          onChange={update}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? "message-error" : undefined}
        />
        {errors.message && (
          <p className="field-error" id="message-error">
            {errors.message}
          </p>
        )}

        <button type="submit">Send Message</button>

        {sent && <p className="field-ok">{sent}</p>}
      </form>
    </section>
  );
}