import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import withAuth from "../../hoc/authHoc";
import SetItem from "./setItem";
import authCtx from "../../contexts/auth";
import Loading from "../../components/layout/loading";
import "./dashboard.scss";

const style = {
  fontSize: "24px",
  color: "lightPink",
  margin: "10px",
};
const Dashboard = () => {
  const { authUser } = useContext(authCtx);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const currentId = authUser ? authUser.user._id : null;
  const [resultArr, setResultArr] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API_DOMAIN}/setCard`, {
      method: "get",
      //body: { _id: currentId },
      // headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${authUser.token}`}
    })
      .then((res) => res.json())
      .then(
        (result) => {
          console.log(result);
          setIsLoaded(true);
          setResultArr(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      );
  }, []);

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <Loading show={isLoaded} />;
  } else {
    // console.log(article);
    return (
      <div className="mx-5">
        <div className="dashboard-wrapper">
          <div className="sidebar">
            <div className="sidebar-item">FlashCard</div>
            <div className="sidebar-item">Multiple Choice</div>
            <div className="sidebar-item folder-item">
              <span>Folder</span>
              <ul>
                <li>English</li>
                <li>ReactJS</li>
              </ul>
            </div>
            <div className="sidebar-footer">
              <a href="#">Privacy Policy</a>
              <p>@2020 FlashMind</p>
              <p className="text-center">
                <i class="fa fa-facebook" style={style}></i>
                <i class="fa fa-twitter" style={style}></i>
                <i class="fa fa-instagram" style={style}></i>
              </p>
            </div>
          </div>
          <div className="mainbar">
            <div className="filterBar">
              <form action="#">
                <input type="radio" id="finish" value="finish" name="status" />
                <label htmlFor="finish">Finish</label>

                <input
                  type="radio"
                  id="unfinish"
                  value="unfinish"
                  name="status"
                />
                <label htmlFor="unfinish">Unfinish</label>

                <input type="radio" id="empty" value="empty" name="status" />
                <label htmlFor="empty">Empty</label>

                <input type="radio" id="all" value="all" name="status" />
                <label htmlFor="all">All</label>
              </form>
            </div>

            <div className="mainbar-content">
              <div className="card-section">
                <div className="section-title">
                  <h2>Your own flashcard</h2>
                  <Link to="/flashcard/new">
                    <button>New +</button>
                  </Link>
                </div>
                <div className="section-body">
                  {/* BEGIN SET ITEM */}

                  {/* USER EMPTY SET DISPLAY FIRST */}
                  {resultArr &&
                    resultArr.map((item) => (
                      <SetItem key={item.id} item={item} />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
};

export default withAuth(Dashboard);
