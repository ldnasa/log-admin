export interface Project {
  guid: string;
  name: string;
  url: string;
  apiKey: string;
  isActive: boolean;
  createdAt: string;
  updatedAt?: string;
  logCount?: number;
}

export interface CreateProjectDto {
  name: string;
  url: string;
  isActive: boolean;
}

export interface UpdateProjectDto {
  name: string;
  url: string;
  isActive: boolean;
}

export interface ProjectsListResponse {
  projects: Project[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}