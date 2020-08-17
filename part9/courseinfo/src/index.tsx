import React from "react";
import ReactDOM from "react-dom";

interface HeaderProps {
  courseName: string;
}

const Header: React.FC<HeaderProps> = ({ courseName }) => (
  <h1>{courseName}</h1>
);

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartWithDescription extends CoursePartBase {
  description: string;
}

interface CoursePartOne extends CoursePartWithDescription {
  name: "Fundamentals";
}

interface CoursePartTwo extends CoursePartBase {
  name: "Using props to pass data";
  groupProjectCount: number;
}

interface CoursePartThree extends CoursePartWithDescription {
  name: "Deeper type usage";
  exerciseSubmissionLink: string;
}

interface CoursePartOwn extends CoursePartWithDescription {
  name: "Adding own course part";
  additionalComment: string;
}

type CoursePart = CoursePartOne | CoursePartTwo | CoursePartThree | CoursePartOwn;

interface CoursePartProps {
  courseParts: Array<CoursePart>;
}

interface PartProps {
  part: CoursePart;
}

const Part: React.FC<PartProps> = ({ part }) => {
  const assertNever = (value: never): never => {
    throw new Error(
      `Unhandled discriminated union member: ${JSON.stringify(value)}`
    );
  };

  switch (part.name) {
    case "Fundamentals":
      return (
        <div>
          <h3>{part.name}</h3>
          Exercise count: {part.exerciseCount}
          <br />
          Description: {part.description}
        </div>
      );
    case "Using props to pass data":
      return (
        <div>
          <h3>{part.name}</h3>
          Exercise count: {part.exerciseCount}
          <br />
          Group project count: {part.groupProjectCount}
        </div>
      );
    case "Deeper type usage":
      return (
        <div>
          <h3>{part.name}</h3>
          Exercise count: {part.exerciseCount}
          <br />
          Description: {part.description}
          <br />
          Exercise submission link: <a href={part.exerciseSubmissionLink}>{part.exerciseSubmissionLink}</a>
        </div>
      );
      case "Adding own course part":
        return (
          <div>
            <h3>{part.name}</h3>
            Exercise count: {part.exerciseCount}
            <br />
            Description: {part.description}
            <br />
            Additional comment: {part.additionalComment}
          </div>
        );
    default:
      return assertNever(part);

  }
}

const Content: React.FC<CoursePartProps> = ({ courseParts }) => {
  return (
    <div>
      <div>
        {courseParts.map(part => 
          <Part key={part.name} part={part} />
        )}
      </div>
    </div>
  )
};

const Total: React.FC<CoursePartProps> = ({ courseParts }) => {
  return (
    <p>
    Total Number of exercises{" "}
    {courseParts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};

const App: React.FC = () => {
  const courseName = "Half Stack application development";
  const courseParts: CoursePart[] = [
    {
      name: "Fundamentals",
      exerciseCount: 10,
      description: "This is an awesome course part"
    },
    {
      name: "Using props to pass data",
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: "Deeper type usage",
      exerciseCount: 14,
      description: "Confusing description",
      exerciseSubmissionLink: "https://fake-exercise-submit.made-up-url.dev"
    },
    {
      name: "Adding own course part",
      exerciseCount: 1,
      description: "For exercise 9.15",
      additionalComment: "I hope it's correct"
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