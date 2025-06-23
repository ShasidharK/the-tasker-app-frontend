function About() {
  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow">
      <h1 className="text-3xl font-bold text-amber-800 mb-6">About The Tasker</h1>
      
      <div className="space-y-4 text-gray-600">
        <p>
          The Tasker is a productivity app inspired by Trello, designed to help you manage boards, lists, and cards efficiently.
          stay focused and accomplish more. The bee-themed timer keeps you motivated and
          productive throughout your day.
        </p>
        
        <h2 className="text-2xl font-semibold text-amber-700 mt-8 mb-4">Key Features</h2>
        
        <ul className="list-disc list-inside space-y-2 ml-4">
                    <li>Task tracking to associate your time blocks with specific tasks</li>
          <li>Daily goals and statistics to monitor your productivity</li>
          <li>Customizable timer settings to match your work style</li>
          <li>Task management system to organize your to-dos</li>
        </ul>

                
        <p>
                    It uses a timer to break work into intervals, traditionally 25 minutes in length, separated by short breaks.
                  </p>
        
        <p className="mt-4">
          The technique is based on the idea that frequent breaks can improve mental agility and help you stay focused.
          The Tasker implements this technique with a bee-themed twist to make productivity more fun and engaging.
        </p>

        <h2 className="text-2xl font-semibold text-amber-700 mt-8 mb-4">Technologies Used</h2>
        
        <ul className="list-disc list-inside space-y-2 ml-4">
          <li>React for UI components</li>
          <li>Redux Toolkit for state management</li>
          <li>React Router for navigation</li>
          <li>Tailwind CSS for styling</li>
          <li>Local storage for saving your settings and statistics</li>
        </ul>
      </div>
    </div>
  )
}

export default About