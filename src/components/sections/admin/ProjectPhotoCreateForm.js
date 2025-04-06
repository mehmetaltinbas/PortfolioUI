function ProjectPhotoCreateForm({ onChange, onSubmit, isHidden }) {
    return (
      <form id="projectPhotoCreateForm" onSubmit={onSubmit} className={`absolute ${isHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border flex flex-col justify-center items-center gap-2`}>
        <input type="file" onChange={onChange} />
        <button type="submit" className="px-2 py-1 border rounded-full bg-blue-200">Update</button>
      </form>
    );
  }
  
  export default ProjectPhotoCreateForm;  