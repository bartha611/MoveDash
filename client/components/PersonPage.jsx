import React, { useEffect, useState } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { fetchPeople } from "../state/ducks/people";
import Show from "./Show";
import FilterDropdown from "./FilterDropdown";

const PersonPage = ({ person }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [department, setDepartment] = useState("Cast");
  const [showType, setShowType] = useState("Movie");
  const { shows } = useSelector((state) => state.people);
  const { personId } = router.query;

  const getFullDate = (date) => {
    return new Date(date).toLocaleDateString();
  };

  const getYear = (date) => {
    return new Date(date).getFullYear();
  };

  useEffect(() => {
    dispatch(
      fetchPeople(
        `/api/people/${personId}?&department=${department}&showType=${showType}`,
        "READ_SHOWS"
      )
    );
  }, [showType, department]);

  return (
    <div className="personPage">
      <Head>
        <title>{person.name}</title>
      </Head>
      <div className="personPage__content">
        <img
          className="personPage__profile"
          src={person.profile}
          alt="Poster for personPage"
        />
        <div className="personPage__information">
          <div>
            <span className="personPage__name">{person.name}</span>
          </div>
          <div className="personPage__biography">
            {person.biography.split("\n\n").map((paragraph, index) => {
              return <div className="personPage__paragraph">{paragraph}</div>;
            })}
          </div>
        </div>
      </div>
      <h1>Known For</h1>
      <div className="personPage__knownFor">
        <FilterDropdown
          setShowType={setShowType}
          showType={showType}
          setDepartment={setDepartment}
          department={department}
        />
        <div className="personPage__shows">
          {shows.length > 0 &&
            shows.map((movie, index) => {
              return <Show show={movie} index={index} showType="movies" />;
            })}
        </div>
      </div>
    </div>
  );
};

export default PersonPage;
