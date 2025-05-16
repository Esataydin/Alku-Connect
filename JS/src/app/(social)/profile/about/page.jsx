"use client";
import { Button, Card, CardBody, CardHeader, CardTitle, Col, Dropdown, DropdownItem, DropdownMenu, DropdownToggle, Row } from 'react-bootstrap';
import { interestsData } from './data';
import PageMetaData from '@/components/PageMetaData';
import { BsBriefcase, BsCalendarDate, BsEnvelope, BsGeoAlt, BsHeart, BsPencilSquare, BsPlusCircleDotted, BsThreeDots, BsTrash } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { GetFindUserData} from '../../../api/ApiService';
import { GetId } from '../../../../utils/GetId';


const Interests = () => {

};
const ActionDropdown = () => {
  return <Dropdown className="ms-auto">
      <DropdownToggle as="a" className="nav nav-link text-secondary mb-0" role="button" id="aboutAction" data-bs-toggle="dropdown" aria-expanded="false">
        <BsThreeDots />
      </DropdownToggle>
      <DropdownMenu className="dropdown-menu-end" aria-labelledby="aboutAction">
        <li>
          <DropdownItem>
            
            <BsPencilSquare size={22} className="fa-fw pe-2" />
            Edit
          </DropdownItem>
        </li>
        <li>
          <DropdownItem>
            
            <BsTrash size={22} className="fa-fw pe-2" />
            Delete
          </DropdownItem>
        </li>
      </DropdownMenu>
    </Dropdown>;
};
const About = () => {
  const [data, setData] = useState();
  const id = GetId();
  console.log("id", id);

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

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data:", formData);
    // Burada API'ye güncelleme isteği atabilirsiniz.
  };

  useEffect(() => {
    const fetchData = async () => {
      const response = await GetFindUserData(id); // id'yi parametre olarak gönder
      if (response) {
        setData(response);

        // Formu API'den gelen değerlerle doldur
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
    };
    fetchData();
  }, [id]);
   return <>
     <PageMetaData title='About' />
     <Card>
      <CardHeader className="border-0 pb-0">
        <CardTitle>Profile Info</CardTitle>
      </CardHeader>
      <CardBody>
        <form onSubmit={handleSubmit}>
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
                  onChange={handleChange}
                />
              </Col>
            ))}
            <Col sm={6}>
              <label>Staff Member</label>
              <select
                name="is_staff_member"
                className="form-control"
                value={formData.is_staff_member ? "true" : "false"}
                onChange={(e) => handleChange(e)}
              >
                <option value="true">Yes</option>
                <option value="false">No</option>
              </select>
            </Col>
          </Row>
          <div className="mt-4">
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </form>
      </CardBody>
    </Card>

      <Interests />
    </>;
};
export default About;