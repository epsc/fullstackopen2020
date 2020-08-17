import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  courseName: string;
}

const Header: React.FC<HeaderProps> = ({ courseName }) => (
  <h1>{courseName}</h1>
);

interface CoursePart {
  name: string;
  exerciseCount: number;
}

interface CoursePartProps {
  courseParts: Array<CoursePart>;
}

const Content: React.FC<CoursePartProps> = ({ courseParts }) => {
  return (
    <div>
      <p>
        {courseParts[0].name} {courseParts[0].exerciseCount}
      </p>
      <p>
        {courseParts[1].name} {courseParts[1].exerciseCount}
      </p>
      <p>
        {courseParts[2].name} {courseParts[2].exerciseCount}
      </p>
    </div>
  )
};

const Total: React.FC<CoursePartProps> = ({ courseParts }) => {
  return (
    <p>
    Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts = [
    {
      name: "Fundamentals",
      exerciseCount: 10
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14
    }
  ];

  return (
    <div>
      <Header courseName={courseName} />
      <Content courseParts={courseParts} />
      <Total courseParts={courseParts} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));