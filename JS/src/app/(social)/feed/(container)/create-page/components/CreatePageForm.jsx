import React, { useEffect, useState } from 'react';
import ChoicesFormInput from '@/components/form/ChoicesFormInput';
import TextAreaFormInput from '@/components/form/TextAreaFormInput';
import TextFormInput from '@/components/form/TextFormInput';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { Button, Card, CardBody, CardHeader, Col } from 'react-bootstrap';
import { GetFindUserData, updateUserProfile } from '@/app/api/ApiService';
import { useId } from '@/utils/useId';

const CreatePageForm = () => {
  const userId = useId();
  const [users, setUsers] = useState(null);

  const createFormSchema = yup.object({
    name: yup.string(),
    email: yup.string().email('Invalid email').required('Please enter your email'),
    birthday_date: yup.string().nullable().typeError('Please enter a valid date'),
    phone_number: yup.string(),
    faculty: yup.string(),
    department: yup.string(),
    field: yup.string(),
    graduation_year: yup.string().required('Please enter your graduation year'),
    job_title: yup.string(),
    working_company: yup.string(),
    work_experience: yup.string().max(500, 'Work experience must be less than 500 characters'),
    student_number: yup
      .number()
      .nullable()
      .typeError('Student number must be a number')
      .integer('Student number must be an integer'),
    is_staff_member: yup
      .boolean()
      .oneOf([true, false], 'Please select staff member status')
      .nullable()
  });

  const {
    control,
    handleSubmit,
    reset,
  } = useForm({
    resolver: yupResolver(createFormSchema),
    defaultValues: {
      name: '',
      email: '',
      birthday_date: '',
      phone_number: '',
      faculty: '',
      department: '',
      field: '',
      graduation_year: '',
      job_title: '',
      working_company: '',
      work_experience: '',
      student_id: '',
    },
  });

  useEffect(() => {
    if (!userId) return; // userId yoksa fetch yapma

    const fetchUsers = async () => {
      try {
        const response = await GetFindUserData(userId);
        setUsers(response);

        reset({
          name: response.name || '',
          email: response.email || '',
          birthday_date: response.birthday_date || '',
          phone_number: response.phone_number || '',
          faculty: response.faculty || '',
          department: response.department || '',
          field: response.field || '',
          graduation_year: response.graduation_year || '',
          job_title: response.job_title || '',
          working_company: response.working_company || '',
          work_experience: response.work_experience || '',
          student_id: response.student_id || '',
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [userId, reset]);

  const onSubmit = async (formData) => {
    if (!userId) return;

    try {
      const file = document.querySelector('input[name="profile_picture"]')?.files[0];
      const result = await updateUserProfile(userId, formData, file);
      alert('Profile updated successfully!');
      console.log('Profile update result:', result);
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred while updating the profile.');
    }
  };

  return (
    <Card>
      <CardHeader className="border-0 pb-0">
        <h1 className="h4 card-title mb-0">Create Profile</h1>
      </CardHeader>
      <CardBody>
        <form className="row g-3" onSubmit={handleSubmit(onSubmit)}>
          {/* Profile Picture */}
          <Col xs={12}>
            <label className="form-label">Profile Picture</label>
            <input type="file" name="profile_picture" accept="image/*" className="form-control" />
            <small>Supported formats: JPG, PNG. Max size: 5MB</small>
          </Col>

          {/* Diğer alanlar */}
          <Col sm={6}>
            <TextFormInput name="name" label="Name" placeholder="Enter your name" control={control} />
          </Col>
          <Col sm={6}>
            <TextFormInput name="email" label="Email" placeholder="Enter your email" control={control} />
          </Col>
          <Col sm={6}>
            <TextFormInput name="birthday_date" label="Birthday Date" placeholder="YYYY-MM-DD" control={control} />
          </Col>
          <Col sm={6}>
            <TextFormInput name="phone_number" label="Phone Number" placeholder="Enter your phone number" control={control} />
          </Col>
          <Col sm={6}>
            <TextFormInput name="faculty" label="Faculty" placeholder="Enter your faculty" control={control} />
          </Col>
          <Col sm={6}>
            <TextFormInput name="department" label="Department" placeholder="Enter your department" control={control} />
          </Col>
          <Col sm={6}>
            <TextFormInput name="field" label="Field" placeholder="Field of expertise" control={control} />
          </Col>
          <Col sm={6}>
            <TextFormInput name="graduation_year" label="Graduation Year" placeholder="YYYY" control={control} />
          </Col>
          <Col sm={6}>
            <TextFormInput name="job_title" label="Job Title" placeholder="Your current job title" control={control} />
          </Col>
          <Col sm={6}>
            <TextFormInput name="working_company" label="Working Company" placeholder="Company you're working at" control={control} />
          </Col>
          <Col sm={6}>
            <TextFormInput name="student_id" label="Student Number" placeholder="Enter your student number" control={control} />
          </Col>

          <Col xs={12}>
            <TextAreaFormInput
              name="work_experience"
              label="Work Experience"
              rows={4}
              placeholder="Describe your work experience"
              control={control}
            />
            <small>Character limit: 500</small>
          </Col>

          <Col xs={12} className="text-end">
            <Button variant="primary" type="submit" className="mb-0">
              Save Profile
            </Button>
          </Col>
        </form>
      </CardBody>
    </Card>
  );
};

export default CreatePageForm;
