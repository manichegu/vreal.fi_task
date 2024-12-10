import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

const LoginRegister = () => {
  const [isLogin, setIsLogin] = useState(true);
  
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch
  } = useForm();

  // Dummy function to simulate checking unique email and phone number
  const checkUniqueFields = (value, type) => {
    const existingEmails = ['test@example.com', 'admin@example.com']; // Simulated existing emails
    const existingPhones = ['1234567890', '9876543210']; // Simulated existing phone numbers
    
    if (type === 'email') {
      return !existingEmails.includes(value);
    } else if (type === 'phone') {
      return !existingPhones.includes(value);
    }
    return true;
  }

  const onSubmit = (data) => {
    toast.success(`${isLogin ? 'Logged In' : 'Registered'} Successfully!`);
    console.log(data);
  }

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-center">
        <div className="card shadow-lg p-4" style={{ maxWidth: '450px', width: '100%' }}>
          <h4 className="text-center mb-4">{isLogin ? 'Login' : 'Register'}</h4>
          <form onSubmit={handleSubmit(onSubmit)}>
            
            {/* Email Field */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className={`form-control ${errors.email ? 'is-invalid' : ''}`} 
                placeholder="Enter email" 
                {...register('email', {
                  required: 'Email is required',
                  validate: (value) => checkUniqueFields(value, 'email') || 'Email is already taken',
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                    message: 'Invalid email format'
                  }
                })} 
              />
              {errors.email && <p className="invalid-feedback">{errors.email.message}</p>}
            </div>

            {/* Phone Number Field */}
            <div className="mb-3">
              <label className="form-label">Phone Number</label>
              <input 
                type="text" 
                className={`form-control ${errors.phone ? 'is-invalid' : ''}`} 
                placeholder="Enter phone number" 
                {...register('phone', {
                  required: 'Phone number is required',
                  validate: (value) => checkUniqueFields(value, 'phone') || 'Phone number is already registered',
                  pattern: {
                    value: /^[0-9]{10}$/,
                    message: 'Phone number must be 10 digits'
                  }
                })} 
              />
              {errors.phone && <p className="invalid-feedback">{errors.phone.message}</p>}
            </div>

            {/* Password Field */}
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className={`form-control ${errors.password ? 'is-invalid' : ''}`} 
                placeholder="Enter password" 
                {...register('password', {
                  required: 'Password is required',
                  minLength: {
                    value: 6,
                    message: 'Password must be at least 6 characters'
                  }
                })} 
              />
              {errors.password && <p className="invalid-feedback">{errors.password.message}</p>}
            </div>

            {/* Confirm Password Field (only for Register) */}
            {!isLogin && (
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input 
                  type="password" 
                  className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`} 
                  placeholder="Confirm your password" 
                  {...register('confirmPassword', {
                    required: 'Please confirm your password',
                    validate: (value) => value === watch('password') || 'Passwords do not match'
                  })} 
                />
                {errors.confirmPassword && <p className="invalid-feedback">{errors.confirmPassword.message}</p>}
              </div>
            )}

            {/* Submit Button */}
            <div className="text-center">
              <button type="submit" className="btn" style={{ backgroundColor: '#003a69', color: '#fff' }}>
                {isLogin ? 'Login' : 'Register'}
              </button>
            </div>
          </form>

          {/* Toggle between Login and Register */}
          <div className="text-center mt-3">
            <button 
              className="btn btn-link" 
              onClick={() => setIsLogin(!isLogin)} 
              style={{ color: '#003a69' }}
            >
              {isLogin ? 'Create an account?' : 'Already have an account?'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginRegister;
