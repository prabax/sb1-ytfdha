import React, { useState, useEffect } from 'react';
import { supabase } from '../supabase';

interface Project {
  id: string;
  name: string;
  data: any;
}

interface ProjectManagerProps {
  onProjectLoad: (data: any) => void;
}

const ProjectManager: React.FC<ProjectManagerProps> = ({ onProjectLoad }) => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [projectName, setProjectName] = useState('');

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('user_id', user.id);

    if (error) {
      console.error('Error loading projects:', error);
      return;
    }

    setProjects(data || []);
  };

  const saveProject = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) return;

    const { data, error } = await supabase
      .from('projects')
      .insert([
        { name: projectName, data: {}, user_id: user.id }
      ]);

    if (error) {
      console.error('Error saving project:', error);
      return;
    }

    setProjectName('');
    loadProjects();
  };

  const loadProject = async (projectId: string) => {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
      .eq('id', projectId)
      .single();

    if (error) {
      console.error('Error loading project:', error);
      return;
    }

    if (data) {
      onProjectLoad(data.data);
    }
  };

  const deleteProject = async (projectId: string) => {
    const { error } = await supabase
      .from('projects')
      .delete()
      .eq('id', projectId);

    if (error) {
      console.error('Error deleting project:', error);
      return;
    }

    loadProjects();
  };

  return (
    <div className="mt-4">
      <h2 className="text-xl font-semibold mb-4 text-primary">Project Manager</h2>
      <div className="flex space-x-2 mb-4">
        <input
          type="text"
          placeholder="Project Name"
          value={projectName}
          onChange={(e) => setProjectName(e.target.value)}
          className="flex-grow px-3 py-2 border rounded-md bg-gray-700 border-gray-600 text-white"
        />
        <button onClick={saveProject} className="bg-secondary text-white px-4 py-2 rounded-md hover:bg-purple-600">
          Save Project
        </button>
      </div>
      <ul className="space-y-2">
        {projects.map((project) => (
          <li key={project.id} className="flex items-center justify-between bg-gray-800 p-2 rounded-md shadow">
            <span className="text-gray-200">{project.name}</span>
            <div>
              <button onClick={() => loadProject(project.id)} className="text-primary hover:underline mr-2">
                Load
              </button>
              <button onClick={() => deleteProject(project.id)} className="text-red-400 hover:underline">
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProjectManager;