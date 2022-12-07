import React from "react";
import { useState, useEffect } from "react";
import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";
import { Octokit } from "octokit";
const octokit = new Octokit({
  auth: process.env.REACT_APP_GITHUB_TOKEN,
});

const GET_API = "/repos/{owner}/{repo}/issues";
const OWNER = "facebook";
const REPO = "react";

function App() {
  const [searchField, setSearchField] = useState("");
  const [issues, setIssues] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const result = await octokit.request(`GET ${GET_API}`, {
          owner: OWNER,
          repo: REPO,
        });

        const newIssues = result.data.map((issue) => ({
          title: issue.title.toLocaleLowerCase(),
          authorID: issue.user.id,
          id: issue.id,
        }));
        setIssues(newIssues);
      } catch (error) {
        console.log(
          `Error! Status: ${error.status}. Message: ${error.response.data.message}`
        );
      }
    }
    fetchData();
  }, []);

  const onInputSearchChange = (event) => {
    const { value } = event.target;
    setSearchField(value);
  };

  const newfilteredIssues =
    searchField.length >= 3 &&
    issues.filter((issue) => {
      return issue.title.includes(searchField.toLocaleLowerCase());
    });

  return (
    <div className="App">
      <SearchBox
        onChangeInputHandler={onInputSearchChange}
        placeholder="search for an issue"
      />
      {newfilteredIssues.length > 0 && (
        <CardList filteredIssues={newfilteredIssues} />
      )}
      {searchField.length >= 3 && newfilteredIssues.length === 0 && (
        <h3>No issues found</h3>
      )}
      {searchField.length > 0 && searchField.length < 3 && (
        <h3>Type at least 3 characters</h3>
      )}
    </div>
  );
}

export default App;
