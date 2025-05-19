"use client";
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Row } from 'react-bootstrap';
import PageMetaData from '@/components/PageMetaData';
import { useEffect, useState } from 'react';
import { GetFindUserData } from '../../../api/ApiService';
import { useId } from '@/utils/useId';

const Interests = () => {
  return null; // Placeholder, sen doldurabilirsin
};

const About = () => {
  const id = useId();
  const [formData, setFormData] = useState({
    email: "",
    name: "",
    student_id: "",
    birthday_date: "",
    phone_number: "",
    faculty: "",
    department: "",
    field: "",
    graduation_year: "",
    job_title: "",
    working_company: "",
    work_experience: "",
    is_staff_member: false,
  });

  useEffect(() => {
    if (!id) return;
    const fetchData = async () => {
      try {
        const response = await GetFindUserData(id);
        if (response) {
          setFormData({
            email: response.email || "",
            name: response.name || "",
            student_id: response.student_id || "",
            birthday_date: response.birthday_date || "",
            phone_number: response.phone_number || "",
            faculty: response.faculty || "",
            department: response.department || "",
            field: response.field || "",
            graduation_year: response.graduation_year || "",
            job_title: response.job_title || "",
            working_company: response.working_company || "",
            work_experience: response.work_experience || "",
            is_staff_member: response.is_staff_member || false,
          });
        }
      } catch (error) {
        console.error('Veri çekme hatası:', error);
      }
    };
    fetchData();
  }, [id]);

  return (
    <>
      <PageMetaData title="About" />
      <Card>
        <CardHeader className="border-0 pb-0">
          <CardTitle>Profile Info</CardTitle>
        </CardHeader>
        <CardBody>
          <form>
            <Row className="g-4">
              {[
                ["email", "Email", "email"],
                ["name", "Full Name", "text"],
                ["student_id", "Student ID", "number"],
                ["birthday_date", "Birthday", "date"],
                ["phone_number", "Phone Number", "text"],
                ["faculty", "Faculty", "text"],
                ["department", "Department", "text"],
                ["field", "Field", "text"],
                ["graduation_year", "Graduation Year", "date"],
                ["job_title", "Job Title", "text"],
                ["working_company", "Company", "text"],
                ["work_experience", "Work Experience", "text"],
              ].map(([name, label, type]) => (
                <Col sm={6} key={name}>
                  <label>{label}</label>
                  <input
                    type={type}
                    className="form-control"
                    name={name}
                    value={formData[name]}
                    readOnly
                  />
                </Col>
              ))}
              <Col sm={6}>
                <label>Staff Member</label>
                <select
                  name="is_staff_member"
                  className="form-control"
                  value={formData.is_staff_member ? "true" : "false"}
                  disabled
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </Col>
            </Row>
          </form>
        </CardBody>
      </Card>

      <Interests />
    </>
  );
};

export default About;
