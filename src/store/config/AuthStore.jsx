const config = (set) => ({
  baseURL: "http://localhost:3001",

  path: "dashboard",
  setPath: (newPath) => set(() => ({ path: newPath })),

  previousPath: "/",
  setPreviousPath: (newPreviousPath) =>
    set(() => ({ previousPath: newPreviousPath })),

  numberOfCourses: "",
  setNumberOfCourses: (newNumberOfCourses) =>
    set(() => ({ numberOfCourses: newNumberOfCourses })),
});

const AuthStore = {
  config,
  shouldLog: true,
};

export default AuthStore;
