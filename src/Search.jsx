import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';


const SearchSchema = Yup.object().shape({
  query: Yup.string().required('Search query cannot be empty')
});

const Search = () => {
  const [todos, setTodos] = useState([]);  // Store fetched data
  const [filteredTodos, setFilteredTodos] = useState([]); // Store filtered data

  
  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/todos')
      .then(response => {
        setTodos(response.data);
        setFilteredTodos(response.data);
      })
      .catch(error => console.error("Error fetching data:", error));
  }, []);

  
  const handleSearch = (values) => {
    const { query } = values;
    const filtered = todos.filter(todo => 
      todo.title.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredTodos(filtered);
  };

  return (
    <div>
      <h1>Todo List Search</h1>

      
      <Formik
        initialValues={{ query: '' }}
        validationSchema={SearchSchema}
        onSubmit={handleSearch}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <Field type="text" name="query" placeholder="Search todos..." />
              <ErrorMessage name="query" component="div" style={{ color: 'red' }} />
            </div>
            <button type="submit" disabled={isSubmitting}>Search</button>
          </Form>
        )}
      </Formik>

    
      <div>
        {filteredTodos.length > 0 ? (
          <ul>
            {filteredTodos.map(todo => (
              <li key={todo.id}>
                <strong>ID:</strong> {todo.id} - <strong>Title:</strong> {todo.title}
              </li>
            ))}
          </ul>
        ) : (
          <p>No results found</p>
        )}
      </div>
    </div>
  );
};

export default Search;



