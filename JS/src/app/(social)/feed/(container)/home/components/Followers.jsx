"use client";
import clsx from 'clsx';
import { Link } from 'react-router-dom';
import { Button, Card, CardBody, CardHeader, CardTitle } from 'react-bootstrap';
import { BsPersonCheckFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { useEffect, useState } from 'react';
import { getFeedUsers, GetUsersData } from '../../../../../api/ApiService';
const Followers = () => {
  const [data, setData] = useState();
  const [userId, setUserId] = useState();
  useEffect(() => {
    const fetchData = async () => {
      const response = await GetUsersData();
      if (response) {
       setData(response);
      }
      console.log('response', response);
    };
    const getId = async () => {
      const response = await getFeedUsers();
      if (response) {
        setUserId(response.id);
      }
    }
    fetchData();
    getId()
  }, []);
  const allFollowers = data;
console.log('allFollowers', allFollowers);
  return <Card>
      <CardHeader className="pb-0 border-0">
        <CardTitle className="mb-0">Who to follow</CardTitle>
      </CardHeader>

      <CardBody>
        {allFollowers?.slice(0, 5).filter(user => user.id !== userId).map((follower, idx) => <div className="hstack gap-2 mb-3" key={idx}>
            <div className={clsx('avatar', {
          'avatar-story': follower.isStory
        })}>
              <span role="button">
                <img className="avatar-img rounded-circle" src={follower.profile_picture} alt="image" />
              </span>
            </div>

            <div className="overflow-hidden">
              <Link className="h6 mb-0" to="">
                {follower.name}
              </Link>
              <p className="mb-0 small text-truncate">{follower.role}</p>
            </div>

            <Button variant={follower.hasRequested ? 'primary' : 'primary-soft'} className="rounded-circle icon-md ms-auto flex-centered">
              <span>{follower.hasRequested ? <BsPersonCheckFill /> : <FaPlus />}</span>
            </Button>
          </div>)}

        <div className="d-grid mt-3">
          <Button variant="primary-soft" size="sm">
            View more
          </Button>
        </div>
      </CardBody>
    </Card>;
};
export default Followers;