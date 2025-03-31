import React from "react";
import AboutUsCard from "../../AboutUsCard";

function AboutUsMarquee() {
  const members = [
    { id: 1, name: "Sarah Johnson", designation: "Lead Developer", imageSrc: "/LandingImage.jpg" },
    { id: 2, name: "Michael Chen", designation: "UI/UX Designer", imageSrc: "/LandingImage.jpg" },
    { id: 3, name: "Emily Rodriguez", designation: "Project Manager", imageSrc: "/LandingImage.jpg" },
    { id: 4, name: "David Thompson", designation: "Backend Developer", imageSrc: "/LandingImage.jpg" },
    { id: 5, name: "Lisa Anderson", designation: "QA Engineer", imageSrc: "/LandingImage.jpg" },
    { id: 6, name: "Yuvraj Singh", designation: "QA Engineer", imageSrc: "/LandingImage.jpg" },
    { id: 7, name: "Swapnil Sinha", designation: "QA Engineer", imageSrc: "/LandingImage.jpg" },
  ];

  return (
    <div className="w-full overflow-hidden whitespace-nowrap">
      <div className="inline-block animate-[marquee_33s_linear_infinite] hover:animate-pause pointer-events-auto">
        <ul className="list-none flex flex-row gap-[5rem]">
          {members.concat(members).map((member, index) => (
            <li key={index} className="w-96">
              <AboutUsCard
                imageSrc={member.imageSrc}
                name={member.name}
                designation={member.designation}
              />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default AboutUsMarquee;