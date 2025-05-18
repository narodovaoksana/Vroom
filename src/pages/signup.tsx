'use client';

import React, { useState } from 'react';
import styles from '@/styles/SignUp.module.css';
import { api } from '@/lib/api';

const SignUp = () => {
  const [fullName, setFullName] = useState('');
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

  const validateEmail = (email: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  const validatePassword = (password: string) => /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
  const validateAge = (dob: string) => {
    const birthDate = new Date(dob);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();
    const m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
    return age;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email) ? '' : 'Invalid email address';
    const passwordError = validatePassword(password)
      ? ''
      : 'Password must be at least 8 characters long, contain one uppercase letter, one number, and one special character';
    const confirmPasswordError = password === confirmPassword ? '' : 'Passwords do not match';
    const fullNameError = fullName ? '' : 'Full name is required';
    const phoneError = phone ? '' : 'Phone number is required';
    const dobError = dob ? '' : 'Date of birth is required';
    const ageError = validateAge(dob) >= 18 ? '' : 'You must be at least 18 years old';
    const termsError = termsAccepted ? '' : 'You must accept the terms of service';
    const privacyError = privacyAccepted ? '' : 'You must accept the privacy policy';

    const newErrors = {
      email: emailError,
      password: passwordError,
      confirmPassword: confirmPasswordError,
      fullName: fullNameError,
      phone: phoneError,
      dob: dobError,
      age: ageError,
      terms: termsError,
      privacy: privacyError,
    };

    setErrors(newErrors);

    const hasErrors = Object.values(newErrors).some((err) => err);
    if (hasErrors) return;

    try {
      console.log('Sending registration data', { fullName, email, password });

      const response = await api.post('/auth/register', {
        fullName,
        email,
        password,
        phoneNumber: phone,
        dateOfBirth: dob,
      });

      alert('✅ Реєстрація успішна!');
      // Можеш редіректити на login:
      // router.push('/login');
    } catch (error: any) {
      console.error('Registration error:', error);
      alert('❌ Помилка реєстрації: ' + (error.response?.data?.message || 'Невідома помилка'));
    }
  };

  const today = new Date().toISOString().split('T')[0];

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Sign Up</h1>
      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          type="text"
          placeholder="Full Name"
          value={fullName}
          onChange={(e) => setFullName(e.target.value)}
          className={styles.input}
        />
        {errors.fullName && <p className={styles.error}>{errors.fullName}</p>}

        <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} className={styles.input} />
        {errors.email && <p className={styles.error}>{errors.email}</p>}

        <input type="tel" placeholder="Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} className={styles.input} />
        {errors.phone && <p className={styles.error}>{errors.phone}</p>}

        {/* Password Field */}
        <div className={styles.passwordContainer}>
          <input
            type={passwordVisible ? 'text' : 'password'}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={styles.input}
          />
          <button type="button" onClick={() => setPasswordVisible(!passwordVisible)} className={styles.toggleButton}>
            {passwordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.password && <p className={styles.error}>{errors.password}</p>}

        {/* Confirm Password */}
        <div className={styles.passwordContainer}>
          <input
            type={confirmPasswordVisible ? 'text' : 'password'}
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={styles.input}
          />
          <button type="button" onClick={() => setConfirmPasswordVisible(!confirmPasswordVisible)} className={styles.toggleButton}>
            {confirmPasswordVisible ? 'Hide' : 'Show'}
          </button>
        </div>
        {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword}</p>}

        {/* Date of Birth */}
        <input type="date" placeholder="Date of Birth" value={dob} onChange={(e) => setDob(e.target.value)} className={styles.input} max={today} />
        {errors.dob && <p className={styles.error}>{errors.dob}</p>}
        {errors.age && <p className={styles.error}>{errors.age}</p>}

        {/* Terms and Privacy */}
        <div className={styles.checkboxContainer}>
          <input type="checkbox" checked={termsAccepted} onChange={(e) => setTermsAccepted(e.target.checked)} />
          <label>I agree to the Terms of Service</label>
        </div>
        {errors.terms && <p className={styles.error}>{errors.terms}</p>}
        <div className={styles.checkboxContainer}>
          <input type="checkbox" checked={privacyAccepted} onChange={(e) => setPrivacyAccepted(e.target.checked)} />
          <label>I agree to the Privacy Policy</label>
        </div>
        {errors.privacy && <p className={styles.error}>{errors.privacy}</p>}

        <button type="submit" className={styles.button}>
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
