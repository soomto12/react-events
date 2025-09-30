import { Link, useNavigate } from 'react-router-dom';
import { queryClient } from '../../utils/http.js';
import Modal from '../UI/Modal.jsx';
import EventForm from './EventForm.jsx';
import { useMutation } from '@tanstack/react-query'; 
import { CreateEvents } from '../../utils/http.js';
import ErrorBlock from '../UI/ErrorBlock.jsx';

export default function NewEvent() {
  const {mutate, isPending, isError, error} = useMutation({
  mutationFn: CreateEvents,
  onSuccess:()=>{
    queryClient.invalidateQueries({queryKey:["events"]});
    navigate("/events")
  }
})

  const navigate = useNavigate();

  function handleSubmit(formData) {
mutate({event:formData})
  }

  return (
    <Modal onClose={() => navigate('../')}>   
      
      <EventForm onSubmit={handleSubmit} >
       {isPending && "Submitting..."}
    {!isPending && ( <>
          <Link to="../" className="button-text">
            Cancel
          </Link>
          <button type="submit" className="button">
            Create
          </button>
        </>)}
      </EventForm>
      {isError && <ErrorBlock title="Failed to create event" message={error.info?.message|| "Failed to send events try again later"}/>
}
    </Modal>
  );
}
