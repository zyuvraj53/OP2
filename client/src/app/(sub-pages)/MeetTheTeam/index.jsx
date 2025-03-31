// pages/meet-the-team.tsx
import AboutUsCard from '../../(components)/AboutUsCard';

const MeetTheTeam = () => {

  const teamMembers = // data/teamMembers.json
    [
      {
        "id": 1,
        "name": "Sarah Johnson",
        "designation": "Lead Developer",
        "imageSrc": "/LandingImage.png"
      },
      {
        "id": 2,
        "name": "Michael Chen",
        "designation": "UI/UX Designer",
        "imageSrc": "/LandingImage.png"
      },
      {
        "id": 3,
        "name": "Emily Rodriguez",
        "designation": "Project Manager",
        "imageSrc": "/LandingImage.png"
      },
    ];
  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <h1 className="text-4xl font-bold text-center mb-12 text-gray-800">
        Our Team
      </h1>

      {/* Container with vertical line */}
      <div className="relative max-w-4xl mx-auto">
        {/* Dark vertical line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 w-1 bg-gray-800 h-full"></div>

        {/* Team members container */}
        <div className="relative -space-y-16">
          {teamMembers.map((member, index) => (
            <div key={member.id} className="relative flex items-center">
              {/* Circle on the line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gray-800 rounded-full -space-y-16"></div>

              {/* Card positioning - alternates left and right */}
              <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8 ml-auto'}`}>
                <AboutUsCard
                  imageSrc={member.imageSrc}
                  name={member.name}
                  designation={member.designation}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MeetTheTeam;