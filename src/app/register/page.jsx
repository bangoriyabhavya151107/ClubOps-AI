"use client";

import Link from "next/link";
import { useState } from "react";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !formData.fullName ||
      !formData.email ||
      !formData.phone ||
      !formData.password ||
      !formData.confirmPassword
    ) {
      setMessage("Please fill all fields.");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setMessage("Account information is valid.");
  };

  return (
    <main className="auth-page">

      <div className="auth-card">

        {/* Logo */}

        <Link href="/" className="auth-logo">

          <div className="auth-logo-icon">
            C
          </div>

          <span>
            ClubOps AI
          </span>

        </Link>


        {/* Heading */}

        <div className="auth-heading">

          <h1>
            Create Account
          </h1>

          <p>
            Join ClubOps AI
          </p>

        </div>


        {/* Register Form */}

        <form
          className="auth-form"
          onSubmit={handleSubmit}
        >

          {/* Full Name */}

          <div className="form-group">

            <label htmlFor="fullName">
              Full Name
            </label>

            <input
              id="fullName"
              name="fullName"
              type="text"
              placeholder="Enter your full name"
              value={formData.fullName}
              onChange={handleChange}
            />

          </div>


          {/* Email */}

          <div className="form-group">

            <label htmlFor="email">
              Email Address
            </label>

            <input
              id="email"
              name="email"
              type="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />

          </div>


          {/* Phone */}

          <div className="form-group">

            <label htmlFor="phone">
              Phone Number
            </label>

            <input
              id="phone"
              name="phone"
              type="tel"
              placeholder="Enter your phone number"
              value={formData.phone}
              onChange={handleChange}
            />

          </div>


          {/* Password */}

          <div className="form-group">

            <label htmlFor="password">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
            />

          </div>


          {/* Confirm Password */}

          <div className="form-group">

            <label htmlFor="confirmPassword">
              Confirm Password
            </label>

            <input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
            />

          </div>


          {/* Message */}

          {message && (
            <div className="auth-message">
              {message}
            </div>
          )}


          {/* Submit */}

          <button
            type="submit"
            className="auth-submit"
          >
            Create Account
          </button>

        </form>


        {/* Login */}

        <div className="auth-footer">

          <span>
            Already have an account?
          </span>

          <Link href="/login">
            Login
          </Link>

        </div>


        {/* Back Home */}

        <Link
          href="/"
          className="back-home"
        >
          ← Back to Home
        </Link>

      </div>

    </main>
  );
}