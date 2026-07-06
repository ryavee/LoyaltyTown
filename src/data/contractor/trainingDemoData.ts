export type TrainingRecord = {
  id: string;
  courseName: string;
  skillCategory: string;
  duration: string;
  completionStatus: string;
  score: string;
};

export const trainingCourses: TrainingRecord[] = [
  { id: "TRN-1001", courseName: "Premium Paint Application", skillCategory: "Painter", duration: "4 hrs", completionStatus: "Completed", score: "94%" },
  { id: "TRN-1002", courseName: "Waterproofing Installation", skillCategory: "Installer", duration: "6 hrs", completionStatus: "In Progress", score: "72%" },
  { id: "TRN-1003", courseName: "Tile Adhesive Best Practices", skillCategory: "Mason", duration: "3 hrs", completionStatus: "Completed", score: "88%" },
  { id: "TRN-1004", courseName: "Warranty Registration Basics", skillCategory: "All Contractors", duration: "2 hrs", completionStatus: "Assigned", score: "0%" },
];
