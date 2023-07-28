import Clients from '../component/Client';
import Projects from '../component/Projects';
import AddClientModal from '../component/AddClientModal';
import AddProjectModal from '../component/AddProjectModal';

export default function Home() {
  return (
    <>
      <div className='d-flex gap-3 mb-4'>
        <AddClientModal />
        <AddProjectModal />
      </div>
      <Projects />
      <hr />
      <Clients />
    </>
  );
}
