import React from "react";
import { Link } from "react-router-dom";
import Cookies from "js-cookie";

class CourseDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course: [],
      user: [],
      authenticatedUser: Cookies.getJSON("authenticatedUser") || null
    };
  }

  componentDidMount() {
    fetch(`http://localhost:5000/api/courses/${this.props.match.params.id}`)
      .then(response => response.json())
      .then(responseData => {
        this.setState({
          course: responseData.course,
          user: responseData.course.user
        });
      });
  }

  render() {
    const authUser = this.state.authenticatedUser;

    return (
      <div>
        <div className="actions--bar">
          <div className="bounds">
            <div className="grid-100">
              {authUser.userId === this.state.user.id ? (
                <React.Fragment>
                  <span>
                    <Link
                      className="button"
                      to={`/course/${this.props.match.params.id}/update`}
                    >
                      {" "}
                      Update Course{" "}
                    </Link>
                    <Link
                      className="button"
                      to={`/course/${this.props.match.params.id}/delete`}
                    >
                      Delete Course
                    </Link>
                  </span>
                </React.Fragment>
              ) : (
                <React.Fragment></React.Fragment>
              )}

              <a className="button button-secondary" href="/">
                Return to List
              </a>
            </div>
          </div>
        </div>
        <div className="bounds course--detail">
          <div className="grid-66">
            <div className="course--header">
              <h4 className="course--label">Course</h4>
              <h3 className="course--title">{this.state.course.title}</h3>
              <p>
                By {this.state.user.firstName} {this.state.user.lastName}
              </p>
            </div>
            <div className="course--description">
              {this.state.course.description}
            </div>
          </div>
          <div className="grid-25 grid-right">
            <div className="course--stats">
              <ul className="course--stats--list">
                <li className="course--stats--list--item">
                  <h4>Estimated Time</h4>
                  <h3>{this.state.course.estimatedTime}</h3>
                </li>
                <li className="course--stats--list--item">
                  <h4>Materials Needed</h4>
                  <ul>{this.state.course.materialsNeeded}</ul>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default CourseDetail;
