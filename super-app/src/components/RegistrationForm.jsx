import { useState } from "react";
import heroImage from "../assets/hero.png";

const initialForm = {
  name: "",
  username: "",
  email: "",
  mobile: "",
  consent: false,
};

function RegistrationForm({ onRegister }) {
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});

  const updateField = (field, value) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const validate = () => {
    const nextErrors = {};
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const usernamePattern = /^[a-zA-Z0-9]+$/;

    if (!form.name.trim()) nextErrors.name = "Field is required";
    if (form.name.trim() && !/^[a-zA-Z ]+$/.test(form.name))
      nextErrors.name = "Only alphabets are allowed";
    if (!form.username.trim()) nextErrors.username = "Field is required";
    if (form.username.trim() && !usernamePattern.test(form.username))
      nextErrors.username = "Use letters and numbers only";
    if (!form.email.trim()) nextErrors.email = "Field is required";
    if (form.email.trim() && !emailPattern.test(form.email))
      nextErrors.email = "Enter a valid email";
    if (!form.mobile.trim()) nextErrors.mobile = "Field is required";
    if (form.mobile.trim() && !/^\d{10}$/.test(form.mobile))
      nextErrors.mobile = "Enter a 10 digit mobile number";
    if (!form.consent)
      nextErrors.consent = "Check this box if you want to proceed";

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const submit = (event) => {
    event.preventDefault();
    if (!validate()) return;
    onRegister({
      name: form.name.trim(),
      username: form.username.trim(),
      email: form.email.trim(),
      mobile: form.mobile.trim(),
    });
  };

  return (
    <section className="register-page">
      <div
        className="register-art"
        style={{ backgroundImage: `url(${heroImage})` }}
      >
        <h2>Discover new things on Superapp</h2>
      </div>
      <form className="register-form" onSubmit={submit} noValidate>
        <h1 className="brand">Super app</h1>
        <p>Create your new account</p>

        <FormField
          placeholder="Name"
          value={form.name}
          error={errors.name}
          onChange={(value) => updateField("name", value)}
        />
        <FormField
          placeholder="UserName"
          value={form.username}
          error={errors.username}
          onChange={(value) => updateField("username", value)}
        />
        <FormField
          placeholder="Email"
          value={form.email}
          error={errors.email}
          type="email"
          onChange={(value) => updateField("email", value)}
        />
        <FormField
          placeholder="Mobile"
          value={form.mobile}
          error={errors.mobile}
          inputMode="numeric"
          onChange={(value) => updateField("mobile", value)}
        />

        <label className="consent-row">
          <input
            checked={form.consent}
            type="checkbox"
            onChange={(event) => updateField("consent", event.target.checked)}
          />
          <span>Share my registration data with Superapp</span>
        </label>
        {errors.consent && <span className="error-text">{errors.consent}</span>}

        <button className="signup-button" type="submit">
          SIGN UP
        </button>

        <small>
          By clicking on Sign up. you agree to Superapp{" "}
          <b>Terms and Conditions of Use</b>
        </small>
        <small>
          To learn more about how Superapp collects, uses, shares and protects
          your personal data please head Superapp <b>Privacy Policy</b>
        </small>
      </form>
    </section>
  );
}

function FormField({ error, onChange, type = "text", ...props }) {
  return (
    <label className="form-field">
      <input
        className={error ? "input-error" : ""}
        type={type}
        onChange={(event) => onChange(event.target.value)}
        {...props}
      />
      {error && <span className="error-text">{error}</span>}
    </label>
  );
}

export default RegistrationForm;
