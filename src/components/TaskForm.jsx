import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

const schema = yup.object().shape({
  title: yup.string().required('Title is required'),
  description: yup.string().required('Description is required'),
  priority: yup.string().required('Priority is required'),
  status: yup.string().required('Status is required'),
  image: yup
    .mixed()
    .test('fileSize', 'File size is too large', (value) => {
      if (!value.length) return true; // No file is acceptable
      return value[0].size <= 2 * 1024 * 1024; // 2MB limit
    })
    .test('fileType', 'Unsupported file format', (value) => {
      if (!value.length) return true; // No file is acceptable
      return ['image/jpeg', 'image/png', 'image/gif'].includes(value[0].type);
    }),
});

const TaskForm = ({ onSubmit, defaultValues }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues,
  });

  const handleFormSubmit = (data) => {
    onSubmit(data);
    reset();
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)} className="card p-4 shadow-sm">
      <div className="mb-3 d-flex flex-column align-items-start">
        <label className="form-label">Title</label>
        <input {...register('title')} className={`form-control ${errors.title ? 'is-invalid' : ''}`} />
        {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
      </div>
      <div className="mb-3 d-flex flex-column align-items-start">
        <label className="form-label">Description</label>
        <textarea {...register('description')} className={`form-control ${errors.description ? 'is-invalid' : ''}`} />
        {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
      </div>
      <div className="mb-3 d-flex flex-column align-items-start">
        <label className="form-label">Priority</label>
        <select {...register('priority')} className={`form-control ${errors.priority ? 'is-invalid' : ''}`}>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && <div className="invalid-feedback">{errors.priority.message}</div>}
      </div>
      <div className="mb-3 d-flex flex-column align-items-start">
        <label className="form-label">Status</label>
        <select {...register('status')} className={`form-control ${errors.status ? 'is-invalid' : ''}`}>
          <option value="todo">To Do</option>
          <option value="doing">Doing</option>
          <option value="done">Done</option>
        </select>
        {errors.status && <div className="invalid-feedback">{errors.status.message}</div>}
      </div>
      <div className="mb-3 d-flex flex-column align-items-start">
        <label className="form-label">Image</label>
        <input
          type="file"
          accept="image/jpeg, image/png, image/gif"
          {...register('image')}
          className={`form-control ${errors.image ? 'is-invalid' : ''}`}
        />
        {errors.image && <div className="invalid-feedback">{errors.image.message}</div>}
      </div>
      <button type="submit" className="btn btn-primary">
        Submit
      </button>
    </form>
  );
};

export default TaskForm;