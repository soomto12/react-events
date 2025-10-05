import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useQuery,useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import Header from '../Header.jsx';
import { deleteEvent, fetchEvent, queryClient } from '../../utils/http.js';
import LoadingIndicator from '../UI/LoadingIndicator.jsx';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function EventDetails() {
const param = useParams()
const navigate = useNavigate()
  const {data, isLoading, error, isError} = useQuery({
    queryKey: ["events-details"],
    queryFn:({signal})=> fetchEvent({id: param.id, signal})
  })
  const {mutate}=useMutation({
    mutationFn : deleteEvent,
    onSuccess : ()=>{
      queryClient.invalidateQueries({queryKey:["events"]})
      navigate("/events")
    }
  })

  function DeleteEvent(){
mutate({id: param.id})


  }

  let content 
  if (isLoading) {
    content = <LoadingIndicator/>
  }

  if (isError) {
    content = <ErrorBlock message={error.info?.message || "error getting this event" } title="an error occured"/>
  }
 if(data){
 content = <div id="event-details-content">
     <header>
          <h1>{data.title}</h1>
          <nav>
            <button onClick={DeleteEvent}>Delete</button>
            <Link to="edit">Edit</Link>
          </nav>
        </header>
          <img src={`http://localhost:3000/${data.image}`} alt="" />
          <div id="event-details-info">
            <div>
              <p id="event-details-location">{data.location}</p>
              <time dateTime={`Todo-DateT$Todo-Time`}>{data.time}</time>
            </div>
            <p id="event-details-description">{data.description}</p>
          </div>
        </div>
 }
  return (
    <>
      <Outlet />
      <Header>
        <Link to="/events" className="nav-item">
          View all Events
        </Link>
      </Header>
      <article id="event-details">
     
       {content}
      </article>
    </>
  );
}
