import React, { useState } from 'react';
import styles from '@/styles/SignUp.module.css';

const SignUp = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [dob, setDob] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [privacyAccepted, setPrivacyAccepted] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const validatePassword = (password: string) => {
    const re = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return re.test(password);
  };

  const validateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear();
    const monthDifference = today.getMonth() - birthDate.getMonth();
    if (monthDifference < 0 || (monthDifference === 0 && today.getDate() < birthDate.getDate())) {
      return age - 1;
    }
    return age;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email) ? '' : 'Invalid email address';
    const passwordError = validatePassword(password) ? '' : 'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character';
    const confirmPasswordError = password === confirmPassword ? '' : 'Passwords do not match';
    const firstNameError = firstName ? '' : 'First name is required';
    const lastNameError = lastName ? '' : 'Last name is required';
    const phoneError = phone ? '' : 'Phone number is required';
    const dobError = dob ? '' : 'Date of birth is required';
    const ageError = validateAge(dob) >= 18 ? '' : 'You must be at least 18 years old';
    const termsError = termsAccepted ? '' : 'You must accept the terms of service';
    const privacyError = privacyAccepted ? '' : 'You must accept the privacy policy';

    if (emailError || passwordError || confirmPasswordError || firstNameError || lastNameError || phoneError || dobError || ageError || termsError || privacyError) {
      setErrors({ email: emailError, password: passwordError, confirmPassword: confirmPasswordError, firstName: firstNameError, lastName: lastNameError, phone: phoneError, dob: dobError, age: ageError, terms: termsError, privacy: privacyError });
      return;
    }

    // Add logic for user registration
    console.log('Form submitted', { firstName, lastName, email, phone, password, dob, termsAccepted, privacyAccepted });
  };

  // Calculate the current date in the format required by the max attribute
  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="First Name"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          required
          className={styles.input}
        />
        {errors.firstName && <p className={styles.error}>{errors.firstName}</p>}
        <input
          type="text"
          placeholder="Last Name"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          required
          className={styles.input}
        />
        {errors.lastName && <p className={styles.error}>{errors.lastName}</p>}
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className={styles.input}
        />
        {errors.email && <p className={styles.error}>{errors.email}</p>}
        <input
          type="tel"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          className={styles.input}
        />
        {errors.phone && <p className={styles.error}>{errors.phone}</p>}
        <div className={styles.passwordContainer}>
          <input
            type={passwordVisible ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button
            type="button"
            onClick={() => setPasswordVisible(!passwordVisible)}
            className={styles.toggleButton}
          >
            {passwordVisible ? "Hide" : "Show"}
          </button>
        </div>
        {errors.password && <p className={styles.error}>{errors.password}</p>}
        <div className={styles.passwordContainer}>
          <input
            type={confirmPasswordVisible ? "text" : "password"}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className={styles.input}
          />
          <button
            type="button"
            onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)}
            className={styles.toggleButton}
          >
            {confirmPasswordVisible ? "Hide" : "Show"}
          </button>
        </div>
        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}
        <input
          type="date"
          placeholder="Date of Birth"
          value={dob}
          onChange={(e) => setDob(e.target.value)}
          required
          className={styles.input}
          max={today} // Set the max attribute to the current date
        />
        {errors.dob && <p className={styles.error}>{errors.dob}</p>}
        {errors.age && <p className={styles.error}>{errors.age}</p>}
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            required
          />
          <label>I agree to the Terms of Service</label>
        </div>
        {errors.terms && <p className={styles.error}>{errors.terms}</p>}
        <div className={styles.checkboxContainer}>
          <input
            type="checkbox"
            checked={privacyAccepted}
            onChange={(e) => setPrivacyAccepted(e.target.checked)}
            required
          />
          <label>I agree to the Privacy Policy</label>
        </div>
        {errors.privacy && <p className={styles.error}>{errors.privacy}</p>}
        <button type="submit" className={styles.button}>Sign Up</button>
      </form>
    </div>
  );
};

export default SignUp;