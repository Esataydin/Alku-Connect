"use client";
import { currentYear, developedBy, developedByLink } from '@/context/constants';
import { Card, CardBody, CardFooter } from 'react-bootstrap';
import avatar7 from '@/assets/images/avatar/07.jpg';
import bgBannerImg from '@/assets/images/bg/01.jpg';
import { Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getFeedUsers } from '../../app/api/ApiService';
const ProfilePanel = ({
  links
}) => {
  const [data, setData] = useState();

  useEffect(() => {
    const fetchData = async () => {
      const response = await getFeedUsers();
      if (response) {
       setData(response);
      }
      console.log('response', response);
    };
    fetchData();
  }, []);
  console.log('data'); 


  return <>
      <Card className="overflow-hidden h-100">
        <div className="h-50px" style={{
        backgroundImage: `url(${bgBannerImg})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
      }} />

        <CardBody className="pt-0">
          <div className="text-center">
          <div className="avatar avatar-lg mt-n5 mb-3">
           <span role="button">
            <img
         height={64}
         width={64}
         src={`${import.meta.env.VITE_API_URL}${data?.profile_picture_url}`}
         alt="Profile"
        className="avatar-img rounded border border-white border-3"
    />
  </span>
</div>
            <h5 className="mb-0">
              
              <Link to="">{data?.name??""}</Link>
            </h5>
            <small>{data?.job_title??""} at {data?.working_company??""}</small>
            {/* <p className="mt-3">I&apos;d love to change the world, but they won’t give me the source code.</p> */}

            <div className="hstack gap-2 gap-xl-3 justify-content-center">
      
              <div className="vr" />
              <div>
                <h6 className="mb-0">{data?.followers_count??""}</h6>
                <small>Followers</small>
              </div>
              <div className="vr" />
              <div>
                <h6 className="mb-0">{data?.following_count??""}</h6>
                <small>Following</small>
              </div>
            </div>
          </div>

          <hr />

          {/* <ul className="nav nav-link-secondary flex-column fw-bold gap-2">
            {links.map((item, idx) => <li key={item.name + idx} className="nav-item">
                <Link className="nav-link" to={item.link}>
                  <img src={item.image} alt="icon" height={20} width={20} className="me-2 h-20px fa-fw" />
                  <span>{item.name} </span>
                </Link>
              </li>)}
          </ul> */}
        </CardBody>

        <CardFooter className="text-center py-2">
          <Link className="btn btn-sm btn-link" to="/profile/feed">
            View Profile
          </Link>
        </CardFooter>
      </Card>
      <ul className="nav small mt-4 justify-content-center lh-1">
        <li className="nav-item">
          <Link className="nav-link" to="/profile/about">
            About
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/settings/account">
            Settings
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" target="_blank" rel="noreferrer" to={developedByLink}>
            Support
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" target="_blank" rel="noreferrer" to="">
            Docs
          </Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" to="/help">
            Help
          </Link>
        </li>
        {/* TODO: I don't even know man */}
        {/* <li className="nav-item">
          <Link className="nav-link" to="/privacy-terms">
            Privacy &amp; terms
          </Link>
        </li> */}
      </ul>

      <p className="small text-center mt-1">
        {/* ©{currentYear} */}
        {/* <a className="text-reset" target="_blank" rel="noreferrer" href={developedByLink}>
          
          {developedBy}
        </a> */}
      </p>
    </>;
};
export default ProfilePanel;