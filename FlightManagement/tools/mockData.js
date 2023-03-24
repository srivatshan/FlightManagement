const courses = [
  {
    id: 1,
    title: "Securing React Apps with Auth0",
    slug: "react-auth0-authentication-security",
    authorId: 1,
    category: "JavaScript",
  },
  {
    id: 2,
    title: "React: The Big Picture",
    slug: "react-big-picture",
    authorId: 1,
    category: "JavaScript",
  },
  {
    id: 3,
    title: "Creating Reusable React Components",
    slug: "react-creating-reusable-components",
    authorId: 1,
    category: "JavaScript",
  },
  {
    id: 4,
    title: "Building a JavaScript Development Environment",
    slug: "javascript-development-environment",
    authorId: 1,
    category: "JavaScript",
  },
  {
    id: 5,
    title: "Building Applications with React and Redux",
    slug: "react-redux-react-router-es6",
    authorId: 1,
    category: "JavaScript",
  },
  {
    id: 6,
    title: "Building Applications in React and Flux",
    slug: "react-flux-building-applications",
    authorId: 1,
    category: "JavaScript",
  },
  {
    id: 7,
    title: "Clean Code: Writing Code for Humans",
    slug: "writing-clean-code-humans",
    authorId: 1,
    category: "Software Practices",
  },
  {
    id: 8,
    title: "Architecting Applications for the Real World",
    slug: "architecting-applications-dotnet",
    authorId: 1,
    category: "Software Architecture",
  },
  {
    id: 9,
    title: "Becoming an Outlier: Reprogramming the Developer Mind",
    slug: "career-reboot-for-developer-mind",
    authorId: 1,
    category: "Career",
  },
  {
    id: 10,
    title: "Web Component Fundamentals",
    slug: "web-components-shadow-dom",
    authorId: 1,
    category: "HTML5",
  },
];

const authors = [
  { id: 1, name: "Cory House" },
  { id: 2, name: "Scott Allen" },
  { id: 3, name: "Dan Wahlin" },
];

const newCourse = {
  id: null,
  title: "",
  authorId: null,
  category: "",
};

const loginCredentials = [
  { id: 1, username: "admin", password: "admin", role: "admin" },
  { id: 2, username: "staff", password: "staff", role: "staff" },
];

const flightDetails = [
  { id: 1, name: "IndiGo", time: "1:15", capacity: 6 },
  { id: 2, name: "SpiceJet", time: "2:30", capacity: 6 },
];

const passanger = [
  {
    id: 1,
    name: "sri",
    dateOfBirth: "25-07-1995",
    address: "chennai",
    passportnumber: "123",
    flightNumber: 1,
    seatNumber: 1,
    wheelChair: "No",
    withInfants: "No",
    isCheckedin: "Yes",
    ansillary: ["Half-meals", "Full-meals"],
  },
  {
    id: 2,
    name: "vat",
    dateOfBirth: "26-07-1995",
    address: "madurai",
    passportnumber: "124",
    flightNumber: 1,
    seatNumber: 2,
    wheelChair: "Yes",
    withInfants: "No",
    isCheckedin: "No",
    ansillary: ["Drinks"],
  },
  {
    id: 3,
    name: "shan",
    dateOfBirth: "27-07-1995",
    address: "bangloore",
    passportnumber: "125",
    flightNumber: 1,
    seatNumber: 3,
    wheelChair: "No",
    withInfants: "Yes",
    isCheckedin: "Yes",
    ansillary: ["Snacks"],
  },
  {
    id: 4,
    name: "Siva",
    dateOfBirth: "28-07-1995",
    address: "bangloore",
    passportnumber: "126",
    flightNumber: 1,
    seatNumber: 4,
    wheelChair: "No",
    withInfants: "No",
    isCheckedin: "No",
    ansillary: [],
  },
];

const ansillaryService = [
  {
    id: 1,
    flightId: 1,
    name: "Half-meals",
  },
  {
    id: 2,
    flightId: 1,
    name: "Full-meals",
  },
  {
    id: 3,
    flightId: 1,
    name: "Drinks",
  },
  {
    id: 4,
    flightId: 1,
    name: "Snacks",
  },
  {
    id: 5,
    flightId: 1,
    name: "Special-meals",
  },
  {
    id: 6,
    flightId: 2,
    name: "Half-meals",
  },
  {
    id: 7,
    flightId: 2,
    name: "Full-meals",
  },
  {
    id: 8,
    flightId: 2,
    name: "Drinks",
  },
];

const newPassanger = {
  id: null,
  name: "",
  dateOfBirth: "",
  address: "",
  passportnumber: "",
  flightNumber: null,
  seatNumber: null,
  wheelChair: false,
  withInfants: false,
  isCheckedin: true,
};

// Using CommonJS style export so we can consume via Node (without using Babel-node)
module.exports = {
  newCourse,
  courses,
  authors,
  loginCredentials,
  flightDetails,
  passanger,
  ansillaryService,
  newPassanger,
};
