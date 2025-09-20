import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { z } from 'zod';

const waitlistSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name must be less than 50 characters'),
  email: z.string()
    .email('Please enter a valid email address')
});

type WaitlistData = z.infer<typeof waitlistSchema>;

const fieldSchemas: Record<keyof WaitlistData, z.ZodString> = {
  name: waitlistSchema.shape.name,
  email: waitlistSchema.shape.email
};

interface ValidationErrors {
  name?: string;
  email?: string;
}

export function WaitlistForm() {
  const [formData, setFormData] = useState<WaitlistData>({
    name: '',
    email: ''
  });
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const successResetTimeoutRef = useRef<ReturnType<typeof window.setTimeout> | null>(null);

  const validateField = (field: keyof WaitlistData, value: string) => {
    try {
      fieldSchemas[field].parse(value);
      setErrors(prev => ({ ...prev, [field]: undefined }));
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        setErrors(prev => ({ ...prev, [field]: error.issues[0]?.message }));
      }
      return false;
    }
  };

  const handleInputChange = (field: keyof WaitlistData) => (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = e.target.value;
    setFormData(prev => ({ ...prev, [field]: value }));

    // Real-time validation
    if (errors[field]) {
      validateField(field, value);
    }
  };

  const handleBlur = (field: keyof WaitlistData) => () => {
    validateField(field, formData[field]);
  };

  const submitToAPI = async (data: WaitlistData) => {
    // Simulate API call with random success/failure
    const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        title: 'Waitlist Signup',
        body: `Name: ${data.name}, Email: ${data.email}`,
        userId: 1,
      }),
    });

    // Simulate occasional failures for demonstration
    if (Math.random() > 0.9) {
      throw new Error('Server is temporarily unavailable. Please try again.');
    }

    if (!response.ok) {
      throw new Error('Failed to join waitlist. Please try again.');
    }

    return response.json();
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // Validate entire form
    try {
      const validatedData = waitlistSchema.parse(formData);

      setIsSubmitting(true);

      try {
        await submitToAPI(validatedData);

        setIsSuccess(true);
        setFormData({ name: '', email: '' });
        setErrors({});

        // Reset success message after 4 seconds
        if (successResetTimeoutRef.current) {
          window.clearTimeout(successResetTimeoutRef.current);
        }

        successResetTimeoutRef.current = window.setTimeout(() => {
          setIsSuccess(false);
          successResetTimeoutRef.current = null;
        }, 4000);
      } catch (error) {
        setApiError(error instanceof Error ? error.message : 'Something went wrong');
      } finally {
        setIsSubmitting(false);
      }
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: ValidationErrors = {};
        error.issues.forEach((issue: z.ZodIssue) => {
          const fieldName = issue.path[0];
          if (fieldName === 'name' || fieldName === 'email') {
            newErrors[fieldName as keyof ValidationErrors] = issue.message;
          }
        });
        setErrors(newErrors);
      }
    }
  };

  useEffect(() => {
    return () => {
      if (successResetTimeoutRef.current) {
        window.clearTimeout(successResetTimeoutRef.current);
      }
    };
  }, []);

  return (
    <section className="waitlist-section">
      <h2>Join Our Waitlist</h2>
      <p className="description">
        Be the first to experience our recipe sharing community. Get early access
        to thousands of recipes from home cooks around the world.
      </p>

      {isSuccess ? (
        <div className="success-message">
          <h3>Thank you for joining!</h3>
          <p>We'll notify you when we launch.</p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="waitlist-form" noValidate>
          {apiError && (
            <div className="error-message" style={{
              padding: '12px',
              marginBottom: '20px',
              background: 'rgba(239, 68, 68, 0.1)',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              color: '#ef4444',
              fontSize: '0.875rem'
            }}>
              {apiError}
            </div>
          )}

          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              value={formData.name}
              onChange={handleInputChange('name')}
              onBlur={handleBlur('name')}
              placeholder="Enter your name"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? 'name-error' : undefined}
              autoComplete="name"
              inputMode="text"
              style={{
                borderColor: errors.name ? 'rgba(239, 68, 68, 0.5)' : undefined,
                background: errors.name ? 'rgba(239, 68, 68, 0.05)' : undefined
              }}
            />
            {errors.name && (
              <span
                id="name-error"
                className="field-error"
                style={{
                  display: 'block',
                  marginTop: '4px',
                  fontSize: '0.875rem',
                  color: '#ef4444',
                  fontWeight: '500'
                }}
              >
                {errors.name}
              </span>
            )}
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={formData.email}
              onChange={handleInputChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Enter your email"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? 'email-error' : undefined}
              autoComplete="email"
              inputMode="email"
              autoCapitalize="off"
              autoCorrect="off"
              style={{
                borderColor: errors.email ? 'rgba(239, 68, 68, 0.5)' : undefined,
                background: errors.email ? 'rgba(239, 68, 68, 0.05)' : undefined
              }}
            />
            {errors.email && (
              <span
                id="email-error"
                className="field-error"
                style={{
                  display: 'block',
                  marginTop: '4px',
                  fontSize: '0.875rem',
                  color: '#ef4444',
                  fontWeight: '500'
                }}
              >
                {errors.email}
              </span>
            )}
          </div>

          <button
            type="submit"
            className="submit-btn"
            disabled={isSubmitting}
            style={{
              opacity: isSubmitting ? 0.7 : 1,
              cursor: isSubmitting ? 'not-allowed' : 'pointer'
            }}
          >
            {isSubmitting ? 'Joining...' : 'Join Waitlist'}
          </button>
        </form>
      )}
    </section>
  );
}
