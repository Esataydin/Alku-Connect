import { lazy, Suspense, useEffect, useState } from "react";
import { useForm } from 'react-hook-form'; // Eğer react-hook-form kullanıyorsan
const TopHeader = lazy(() => import("@/components/layout/TopHeader"));
import GlightBox from '@/components/GlightBox';
import { useFetchData } from '@/hooks/useFetchData';
import clsx from 'clsx';
import {
  BsBuilding,
  BsBuildings,
  BsDiagram3,
} from 'react-icons/bs';
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardTitle,
  Col,
  Container,
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
  Row
} from 'react-bootstrap';
import {
  BsBookmark,
  BsBriefcase,
  BsCalendar2Plus,
  BsCalendarDate,
  BsChatLeftText,
  BsEnvelope,
  BsFileEarmarkPdf,
  BsGear,
  BsGeoAlt,
  BsHeart,
  BsLock,
  BsPatchCheckFill,
  BsPencilFill,
  BsPersonX,
  BsThreeDots,
  BsTelephone, BsCalendarCheck
  
  
} from 'react-icons/bs';
import { PROFILE_MENU_ITEMS } from '@/assets/data/menu-items';
import { getAllUsers } from '@/helpers/data';
import { GetFindUserData } from '@/app/api/ApiService'; // API fonksiyonun
import avatar7 from '@/assets/images/avatar/07.jpg';
import background5 from '@/assets/images/bg/05.jpg';
import { Link, useLocation } from "react-router-dom";
import FallbackLoading from "@/components/FallbackLoading";
import Preloader from "@/components/Preloader";
import { useId } from '@/utils/useId';

const Friends = () => {
  const allFriends = useFetchData(getAllUsers);
  return (
    <Card>
      <CardHeader className="d-sm-flex justify-content-between align-items-center border-0">
        <CardTitle>
          Friends <span className="badge bg-danger bg-opacity-10 text-danger">230</span>
        </CardTitle>
        <Button variant="primary-soft" size="sm">
          See all friends
        </Button>
      </CardHeader>
      <CardBody className="position-relative pt-0">
        <Row className="g-3">
          {allFriends?.slice(0, 4).map((friend, idx) => (
            <Col xs={6} key={idx}>
              <Card className="shadow-none text-center h-100">
                <CardBody className="p-2 pb-0">
                  <div className={clsx('avatar avatar-xl', { 'avatar-story': friend.isStory })}>
                    <span role="button">
                      <img className="avatar-img rounded-circle" src={friend.avatar} alt="" />
                    </span>
                  </div>
                  <h6 className="card-title mb-1 mt-3">
                    <Link to="">{friend.name}</Link>
                  </h6>
                  <p className="mb-0 small lh-sm">{friend.mutualCount} mutual connections</p>
                </CardBody>
                <div className="card-footer p-2 border-0">
                  <button className="btn btn-sm btn-primary me-1" title="Send message">
                    <BsChatLeftText />
                  </button>
                  <button className="btn btn-sm btn-danger" title="Remove friend">
                    <BsPersonX />
                  </button>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
};

const ProfileLayout = ({ children }) => {
  const { pathname } = useLocation();

  const [users, setUsers] = useState(null);
  const { reset } = useForm();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const userId = 1;
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
        });
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, [reset]);

  return (
    <>
      <Suspense fallback={<Preloader />}>
        <TopHeader />
      </Suspense>

      <main>
        <Container>
          <Row className="g-4">
            <Col lg={8} className="vstack gap-4">
              <Card>
                <div
                  className="h-200px rounded-top"
                  style={{
                    backgroundImage: `url(${background5})`,
                    backgroundPosition: 'center',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                  }}
                />
                <CardBody className="py-0">
                  <div className="d-sm-flex align-items-start text-center text-sm-start">
                    <div>
                      <div className="avatar avatar-xxl mt-n5 mb-3">
                        <img
                          className="avatar-img rounded-circle border border-white border-3"
                          src={users?.profile_picture}
                          alt="avatar"
                        />
                      </div>
                    </div>
                    <div className="ms-sm-4 mt-sm-3">
                      <h1 className="mb-0 h5">{users?.name ?? 'Yok'}
                         <BsPatchCheckFill className="text-success small" />
                      </h1>
                      <p></p>
                    </div>
                    <div className="d-flex mt-3 justify-content-center ms-sm-auto">
                      <Button variant="danger-soft" className="me-2" type="button">
                        <BsPencilFill size={19} className="pe-1" /> Edit profile
                      </Button>
                      <Dropdown>
                        <DropdownToggle
                          as="a"
                          className="icon-md btn btn-light content-none"
                          type="button"
                          id="profileAction2"
                          data-bs-toggle="dropdown"
                          aria-expanded="false"
                        >
                          <span>
                            <BsThreeDots />
                          </span>
                        </DropdownToggle>
                        <DropdownMenu className="dropdown-menu-end" aria-labelledby="profileAction2">
                          <li>
                            <DropdownItem>
                              <BsBookmark size={22} className="fa-fw pe-2" />
                              Share profile in a message
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem>
                              <BsFileEarmarkPdf size={22} className="fa-fw pe-2" />
                              Save your profile to PDF
                            </DropdownItem>
                          </li>
                          <li>
                            <DropdownItem>
                              <BsLock size={22} className="fa-fw pe-2" />
                              Lock profile
                            </DropdownItem>
                          </li>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <li>
                            <DropdownItem>
                              <BsGear size={22} className="fa-fw pe-2" />
                              Profile settings
                            </DropdownItem>
                          </li>
                        </DropdownMenu>
                      </Dropdown>
                    </div>
                  </div>
                  <ul className="list-inline mb-0 text-center text-sm-start mt-3 mt-sm-0">
                    <li className="list-inline-item">
                      <BsBriefcase className="me-1" /> {users?.job_title ?? 'Yok'}
                    </li>
                    <li className="list-inline-item">
                      <BsGeoAlt className="me-1" /> Türkiye
                    </li>
                    <li className="list-inline-item">
                      <BsCalendar2Plus className="me-1" /> {users?.birthday_date ?? 'Yok'}
                    </li>
                  </ul>
                </CardBody>
                <CardFooter className="card-footer mt-3 pt-2 pb-0">
                  <ul className="nav nav-bottom-line align-items-center justify-content-center justify-content-md-start mb-0 border-0">
                    {PROFILE_MENU_ITEMS.map((item, idx) => (
                      <li className="nav-item" key={idx}>
                        <Link
                          className={clsx('nav-link', {
                            active: pathname === item.url,
                          })}
                          to={item.url ?? ''}
                        >
                          {item.label}
                          {item.badge && (
                            <span className="badge bg-success bg-opacity-10 text-success small">
                              {item.badge.text}
                            </span>
                          )}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </CardFooter>
              </Card>
              <Suspense fallback={<FallbackLoading />}>{children}</Suspense>
            </Col>
            <Col lg={4}>
              <Row className="g-4">
                <Col md={6} lg={12}>
                <Card>
  <CardHeader className="border-0 pb-0">
    <CardTitle>About</CardTitle>
  </CardHeader>
  <CardBody className="position-relative pt-0">
    <p>{users?.work_experience ?? 'Yok'}</p>
    <ul className="list-unstyled mt-3 mb-0">
      <li className="mb-2">
        <BsBuilding size={18} className="fa-fw pe-1" /> Fakülte:{" "}
        <strong>{users?.faculty ?? 'Yok'}</strong>
      </li>
      <li className="mb-2">
        <BsBuildings size={18} className="fa-fw pe-1" /> Bölüm:{" "}
        <strong>{users?.department ?? 'Yok'}</strong>
      </li>
      <li className="mb-2">
        <BsDiagram3 size={18} className="fa-fw pe-1" /> Alan:{" "}
        <strong>{users?.field ?? 'Yok'}</strong>
      </li>
      <li className="mb-2">
        <BsEnvelope size={18} className="fa-fw pe-1" /> E-posta:{" "}
        <strong>{users?.email ?? 'Yok'}</strong>
      </li>
      <li className="mb-2">
        <BsTelephone size={18} className="fa-fw pe-1" /> Telefon:{" "}
        <strong>{users?.phone_number ?? 'Yok'}</strong>
      </li>
      <li className="mb-2">
        <BsCalendarCheck size={18} className="fa-fw pe-1" /> Mezuniyet Yılı:{" "}
        <strong>{users?.graduation_year ?? 'Yok'}</strong>
      </li>
    </ul>
  </CardBody>
</Card>

                </Col>
                <Col md={6} lg={12}>
                  <Friends />
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
};

export default ProfileLayout;
