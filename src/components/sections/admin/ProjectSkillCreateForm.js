function ProjectSkillCreateForm({ formData, onChange, onSubmit, isHidden }) {
    return (
      <form id="projectSkillCreationForm" onSubmit={onSubmit} className={`absolute ${isHidden ? 'hidden' : ''} bg-white p-6 rounded-2xl shadow-md border flex flex-col justify-center items-center gap-2`}>
        <input name="name" value={formData.name} onChange={onChange} placeholder="name..." className="border p-2 rounded-full" />
        <button type="submit" className="p-2 border rounded-full">Add</button>
      </form>
    );
  }
  
  export default ProjectSkillCreateForm;  