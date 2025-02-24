"use client";

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { toast } from 'react-toastify';

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

type FormData = z.infer<typeof FormSchema>;

const FormPage = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      const response = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) throw new Error('Registration failed');

      toast.success('Registration Successful');
    } catch (error: unknown) {
      if (error instanceof Error) {
        toast.error(`Registration Failed: ${error.message}`);
      } else {
        toast.error('Registration Failed: Unknown error occurred');
      }
    }
  };

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      <input {...form.register('email')} placeholder="Email" />
      <input {...form.register('password')} type="password" placeholder="Password" />
      <button type="submit">Register</button>
    </form>
  );
};

export default FormPage;