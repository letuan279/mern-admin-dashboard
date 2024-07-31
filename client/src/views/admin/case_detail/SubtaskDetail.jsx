import React from 'react';

const SubtaskDetails = ({ subtask }) => {
  return (
    <div>
      <h3>{subtask.title}</h3>
      <p>{subtask.description}</p>
      <p>Status: {subtask.status}</p>
      <p>Assigned to: {subtask.assignee}</p>
      <p>Due date: {subtask.dueDate}</p>
      {/* Add any other relevant subtask details here */}
      <button onClick={() => handleSubtaskCompletion(subtask)}>
        Mark as Complete
      </button>
    </div>
  );
};

const handleSubtaskCompletion = (subtask) => {
  // Add your logic to handle subtask completion here
  console.log(`Subtask "${subtask.title}" has been marked as complete.`);
};

export default SubtaskDetails;