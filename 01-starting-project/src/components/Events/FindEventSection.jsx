import { useRef } from 'react';
import { useQuery } from '@tanstack/react-query';
import fetchEvents from '../../utils/http';
import { useState } from 'react';  
import ErrorBlock from '../UI/ErrorBlock';          
import EventItem from './EventItem';
import LoadingIndicator from '../UI/LoadingIndicator';


export default function FindEventSection() {
  const searchElement = useRef();
  const [searchTerm, setSearchTrem] = useState()

  const {data, isLoading, isError,error} =useQuery({
  queryKey:["events", {search: searchTerm}],
  queryFn: ({signal}) => fetchEvents({signal, searchTerm}),
  enabled: searchTerm !== undefined
})
  function handleSubmit(event) {
    event.preventDefault();
  setSearchTrem(searchElement.current.value)
  
  }

  let content =<p>Please enter a search term and to find events.</p>

if (data) {
  content = ( <ul className=''>
    {data.map(event=> <li key={event.id}>
      <EventItem event={event} />
    </li>)}
  </ul>)
}

if (isError){
content = <ErrorBlock title=" An error occured" message={ error.info?.message || "Failed to fetch events"}/>
}

if (isLoading) {
  content = <LoadingIndicator/>
}


  return (
    <section className="content-section" id="all-events-section">
      <header>
        <h2>Find your next event!</h2>
        <form onSubmit={handleSubmit} id="search-form">
          <input
            type="search"
            placeholder="Search events"
            ref={searchElement}
          />
          <button>Search</button>
        </form>
      </header>
      {content}
    </section>
  );
}
