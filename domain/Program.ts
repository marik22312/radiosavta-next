export interface Program {
  id: number;
  name_en: string;
  name_he: string;
  description: string;
  cover_image: string;
  is_displayed: boolean;
  created_at: string;
  updated_at: string;
  programTimes: ProgramTime;
  users: Broadcaster[];
}

export interface ProgramTime {
  id: number;
  program_id: number;
  day_of_week: string;
  start_time: string;
  end_time: string;
  created_at: string;
}

export interface Broadcaster {
  id: number;
  name: string;
  quote: string;
  location: string;
  profile_image: string;
  is_admin: boolean;
}
