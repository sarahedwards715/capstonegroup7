import "./SearchBar.scss";
import React, { useState } from "react";
import { Button, Form, InputGroup } from "react-bootstrap";
import { Icon } from "semantic-ui-react";
import { useHistory } from "react-router-dom";

function SearchBar() {
  const [query, setQuery] = useState("");

  let history = useHistory();

  function handleSubmit(event) {
    event.preventDefault();
    history.push("/search/" + encodeURIComponent(query));
  }

  return (
    <div className="searchBarWrapper">
      <Form onSubmit={(e) => handleSubmit(e)}>
        <Form.Group>
          <InputGroup hasValidation>
            <InputGroup.Prepend>
              <Icon name="search" />
            </InputGroup.Prepend>
            <Form.Control
              name="query"
              placeholder="Search . . ."
              onChange={(e) => setQuery(e.target.value)}
              value={query}
            />
            <InputGroup.Append>
              <Button type="submit">Search</Button>
            </InputGroup.Append>
          </InputGroup>
        </Form.Group>
      </Form>
    </div>
  );
}

export default SearchBar;
