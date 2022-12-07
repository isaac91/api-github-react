import React from 'react';
import { useState, useEffect } from "react";
import SearchBox from "./components/search-box/search-box.component";
import CardList from "./components/card-list/card-list.component";
import { Octokit } from "octokit";


function App() {
  const [searchField, setSearchField] = useState("");
  const [issues, setIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);

  useEffect(() => {
    const octokit = new Octokit({
      auth: "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",
    });

    async function fetchData() {
      try {
        const result = await octokit.request(
          "GET /repos/{owner}/{repo}/issues",
          {
            owner: "facebook",
            repo: "react",
          }
        );

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

  useEffect(() => {
    if (searchField.length < 1) {
      setFilteredIssues([]);
      return;
    }
    const newfilteredIssues = issues.filter((issue) => {
      return issue.title.includes(searchField.toLocaleLowerCase());
    });
    setFilteredIssues(newfilteredIssues);
  }, [searchField, issues]);

  const onInputSearchChange = (event) => {
    const result = event.target.value;
    setSearchField(result);
  };

  return (
    <div className="App">
      <SearchBox
        onChangeInputHandler={onInputSearchChange}
        placeholder="search for an issue"
      />
      {filteredIssues.length > 0 && (
        <CardList filteredIssues={filteredIssues} />
      )}
    
    </div>
  );
}

export default App;
