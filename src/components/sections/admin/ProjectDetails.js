import BodyButton from '../../buttons/BodyButton.js';
import { FaGithub, FaExternalLinkAlt } from "react-icons/fa";

function ProjectDetails({ project, onBack, onUpdateProject, onToggleSkillCreateForm, onDeleteSkill, onTogglePhotoCreateForm }) {
  return (
    <div className="w-full flex flex-col justify-center items-center gap-4">
      <div className="w-full flex items-center justify-start gap-4">
        <BodyButton onClick={() => onBack(null)}>←</BodyButton>
        <p className="inline-block text-2xl font-semibold flex-1">{project.title}</p>
      </div>
      <form onSubmit={onUpdateProject} className="w-full flex flex-col justify-center items-center gap-2">
        <div className="w-full flex justify-start items-center gap-2">
          <label className="whitespace-nowrap">Title: </label>
          <input name="title" onChange={onUpdateProject} value={project.title} className="border p-2 rounded-[10px] w-full" />
        </div>
        {/* Similar for shortDescription, longDescription */}
        <button type="submit" className="px-2 py-1 border rounded-full w-fit">Save</button>
      </form>

      <div className="flex flex-col justify-center items-center gap-2">
        <div className="flex justify-center items-center gap-2">
          <p className="font-semibold">Project Skills</p>
          <button onClick={onToggleSkillCreateForm} className="text-2xl text-blue-500">+</button>
        </div>
        <div className="w-full flex justify-start items-center gap-[10px]">
          {project.projectSkills?.map((skill) => (
            <div key={skill._id} className="flex justify-start items-center">
              <p className="whitespace-nowrap">• {skill.name}</p>
              <button onClick={() => onDeleteSkill(skill._id)} className="w-[20px] h-[20px] border rounded-full p-[2px] text-xs bg-red-200">X</button>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <div className="flex justify-center items-center gap-2 md:col-span2 xl:col-span-3">
          <p className="font-semibold">Project Photos</p>
          <button onClick={onTogglePhotoCreateForm} className="text-2xl text-blue-500">+</button>
        </div>
        {project.projectPhotos?.map((photo) => (
          <img key={photo._id} src={photo.value} className="w-[300px] h-[300px] object-cover rounded-[10px]" />
        ))}
      </div>
    </div>
  );
}

export default ProjectDetails;