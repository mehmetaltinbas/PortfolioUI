function ProjectCreateForm({ formData, onChange, onSubmit, isHidden }) {
    return (
      <form onSubmit={onSubmit} className={`${isHidden ? 'hidden' : ''} absolute bg-white p-6 rounded-2xl shadow-md border flex flex-col justify-center items-center gap-2`}>
        <div>
          <label>Title: </label>
          <input name="title" value={formData.title} onChange={onChange} placeholder="title..." className="border p-2 rounded-full" />
        </div>
        {/* Similar for shortDescription, longDescription */}
        <button type="submit" className="p-2 border rounded-full">Create</button>
      </form>
    );
  }
  
  export default ProjectCreateForm;  