import { useState } from 'react';
import { sanitizeText } from '../lib/sanitize';
import { trackEvent } from '../lib/telemetry';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY = { name: '', email: '', ffNumber: '' };

export default function MemberForm({ onSubmit }) {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});

  function validate(v) {
    const next = {};
    if (!v.name.trim()) next.name = 'Full name is required';
    if (!v.email.trim()) next.email = 'Email is required';
    else if (!EMAIL_RE.test(v.email.trim())) next.email = 'Enter a valid email address';
    if (!v.ffNumber.trim()) next.ffNumber = 'Frequent flyer number is required';
    return next;
  }

  function handleChange(field) {
    return (event) => {
      setValues((prev) => ({ ...prev, [field]: event.target.value }));
    };
  }

  function handleSubmit(event) {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      trackEvent('member_form_invalid');
      return;
    }

    const payload = {
      name: sanitizeText(values.name),
      email: sanitizeText(values.email),
      ffNumber: sanitizeText(values.ffNumber),
    };

    trackEvent('member_created');
    onSubmit?.(payload);
    setValues(EMPTY);
    setErrors({});
  }

  return (
    <form
      className="member-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Add frequent flyer member"
    >
      <div className="form-field">
        <label htmlFor="ff-name">Full name</label>
        <input
          id="ff-name"
          type="text"
          autoComplete="name"
          value={values.name}
          onChange={handleChange('name')}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? 'ff-name-error' : undefined}
          className={errors.name ? 'input input--invalid' : 'input'}
        />
        {errors.name && (
          <p id="ff-name-error" className="error-text">
            {errors.name}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="ff-email">Email</label>
        <input
          id="ff-email"
          type="email"
          autoComplete="email"
          value={values.email}
          onChange={handleChange('email')}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? 'ff-email-error' : undefined}
          className={errors.email ? 'input input--invalid' : 'input'}
        />
        {errors.email && (
          <p id="ff-email-error" className="error-text">
            {errors.email}
          </p>
        )}
      </div>

      <div className="form-field">
        <label htmlFor="ff-number">Frequent flyer number</label>
        <input
          id="ff-number"
          type="text"
          autoComplete="off"
          value={values.ffNumber}
          onChange={handleChange('ffNumber')}
          aria-invalid={Boolean(errors.ffNumber)}
          aria-describedby={errors.ffNumber ? 'ff-number-error' : undefined}
          className={errors.ffNumber ? 'input input--invalid' : 'input'}
        />
        {errors.ffNumber && (
          <p id="ff-number-error" className="error-text">
            {errors.ffNumber}
          </p>
        )}
      </div>

      <div className="form-actions">
        <button type="submit" className="btn btn--primary">
          Save member
        </button>
      </div>
    </form>
  );
}
