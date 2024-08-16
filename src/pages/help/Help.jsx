import { useState } from "react";
import TopBar from "../../components/topBar/TopBar";
import "./Help.css";
import CustomButton from "../../components/customButton/CustomButton";

const Help = () => {
  const [expandedQuestion, setExpandedQuestion] = useState(null);

  const content = [
    {
      id: 1,
      question:
        "What plan should I choose if I am only beginning an Amazon store?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Delectus eum aspernatur quasi ratione velit ipsa exercitationem eligendi, enim temporibus consectetur dolor ex sint excepturi, porro est nulla fugit vero neque! Ab, error et aliquam molestias, debitis odit non perspiciatis eveniet officiis excepturi exercitationem libero earum illo natus a, ea cum.",
    },
    {
      id: 2,
      question: "How can your product database benefit my business?",
      answer:
        "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Perferendis fugiat illum qui, ipsum quae fugit voluptates quo modi natus iusto neque dicta eos earum aliquam molestias maiores repellat a itaque ab eius doloremque fuga quidem veritatis. Provident dolore similique nostrum commodi, non ratione voluptates possimus totam ipsam sunt delectus labore.",
    },
    {
      id: 3,
      question: "What types of leads are included in your product database?",
      answer:
        "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Ipsa quas aperiam quam distinctio beatae quaerat facilis nisi veniam expedita fuga quae ratione accusamus laudantium pariatur, nesciunt repellat sapiente minima, officiis cupiditate libero enim accusantium quis. Fuga perspiciatis totam quis similique quos dicta rem cumque, dolore, voluptatum nostrum, aliquam dolorum quasi!",
    },
    {
      id: 4,
      question: "What do I need to sign up and use your service?",
      answer:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Corrupti culpa neque, debitis omnis delectus nesciunt recusandae dignissimos velit sunt quasi a perspiciatis voluptatum aliquam architecto autem vitae? Beatae neque maiores possimus explicabo, fuga, soluta doloribus adipisci, exercitationem dicta debitis quasi consequatur? Excepturi velit incidunt optio temporibus, unde doloribus enim magni?",
    },
  ];

  const handleQuestionToggle = (id) => {
    setExpandedQuestion((prev) => (prev === id ? null : id));
  };

  return (
    <div className="">
      <TopBar />

      <div className="flex items-center justify-center mb-8 pt-28">
        <CustomButton className="help-animation">
          FREQUENTLY ASKED QUESTIONS
        </CustomButton>
      </div>
      <div className="help-animation shadow-none mb-20 px-8 ">
        {content.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => handleQuestionToggle(item.id)}
            // onMouseLeave={() => handleQuestionToggle(item.id)}
            className=""
          >
            <div className=" border border-solid"></div>
            <p className="text-[23px] text-gray-600 font-[400] font-sans p-3">
              {item.question}
            </p>
            {expandedQuestion === item.id && (
              <p className="font-sans px-3 text-gray-600">{item.answer}</p>
            )}
          </div>
        ))}
        <div className=" border border-solid"></div>
      </div>
    </div>
  );
};

export default Help;
